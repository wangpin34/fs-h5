'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Constants = require('./Constants');

var _ErrorHandler = require('./ErrorHandler');

var _ErrorHandler2 = _interopRequireDefault(_ErrorHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEFAULT_SIZE = 10 * 1024 * 1024;
var FS = null;
var initialized = false;
var initializing = false;

var fs = function () {
	function fs() {
		_classCallCheck(this, fs);
	}

	_createClass(fs, null, [{
		key: 'isReady',
		value: function isReady() {
			return initialized;
		}
	}, {
		key: 'requestQuota',
		value: function requestQuota() {
			var bytes = arguments.length <= 0 || arguments[0] === undefined ? _Constants.Default.DEFAULT_SIZE : arguments[0];

			return new Promise(function (resolve, reject) {
				navigator.webkitPersistentStorage.requestQuota(bytes, function (grantBytes) {
					resolve(grantBytes);
				}, function (err) {
					var msg = _ErrorHandler2.default.on(err, 'request quota');
					reject({ err: err, msg: msg });
				});
			});
		}
	}, {
		key: 'init',
		value: function init() {
			var bytes = arguments.length <= 0 || arguments[0] === undefined ? DEFAULT_SIZE : arguments[0];
			var type = arguments.length <= 1 || arguments[1] === undefined ? window.TEMPORARY : arguments[1];


			return new Promise(function (resolve, reject) {
				if (initializing) return; //Make sure only one init is executing
				initializing = true;
				initialized = false;

				(window.requestFileSystem || window.webkitRequestFileSystem)(type, bytes, function (h5fs) {
					FS = h5fs;
					initializing = false;
					initialized = true;
					resolve(h5fs);
				}, function (err) {
					var msg = _ErrorHandler2.default.on(err, 'init file system');
					reject({ err: err, msg: msg });
				});
			});
		}
	}, {
		key: 'existsPath',
		value: function existsPath() {
			var path = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];


			return Promise.all([new Promise(function (resolve, reject) {
				FS.root.getDirectory(path, {}, function (dirEntry) {
					resolve({ exists: true, dirEntry: dirEntry });
				}, function (err) {
					//Resovle as false if it is not found error or it is not a directory
					if (err.code === _Constants.FileError.NOT_FOUND_ERR || err.code === _Constants.FileError.TYPE_MISMATCH) {
						resolve({ exists: false });
					} else {
						var msg = _ErrorHandler2.default.on(err, 'check whether dir ' + path + ' exists');
						resolve({ msg: msg });
					}
				});
			}), new Promise(function (resolve, reject) {
				FS.root.getFile(path, {}, function (fileEntry) {
					resolve({ exists: true, fileEntry: fileEntry });
				}, function (err) {
					//Resovle as false if it is not found error
					if (err.code === _Constants.FileError.NOT_FOUND_ERR || err.code === _Constants.FileError.TYPE_MISMATCH) {
						resolve({ exists: false });
					} else {
						var msg = _ErrorHandler2.default.on(err, 'check whether file' + path + ' exists');
						resolve({ msg: msg });
					}
				});
			})]).then(function (_ref) {
				var _ref2 = _slicedToArray(_ref, 2);

				var ret1 = _ref2[0];
				var ret2 = _ref2[1];

				if (ret1.exists || ret2.exists) {
					return true;
				} else if (ret1.exists === false || ret2.exists === false) {
					return false;
				} else {
					throw new Error(ret1.msg + ' ' + ret2.msg);
				}
			});
		}
	}, {
		key: 'mkdir',
		value: function mkdir() {
			var path = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];


			return new Promise(function (resolve, reject) {

				var folders = path.split('/').filter(function (e) {
					return e !== '' && e !== '.';
				});

				var createDir = function createDir(folders, dir) {

					var parent = dir || FS.root;

					// Throw out './' or '/' and move on to prevent something like '/foo/.//bar'. 
					if (folders[0] == '.' || folders[0] == '') {
						folders = folders.slice(1);
					}

					parent.getDirectory(folders[0], { create: true }, function (dirEntry) {
						// Recursively add the new subfolder (if we still have another to create). 
						if (folders.length > 1) {
							createDir(folders.slice(1), dirEntry);
						} else {
							resolve(dirEntry);
						}
					}, function (err) {
						var msg = _ErrorHandler2.default.on(err, 'create dir ' + path);
						reject({ err: err, msg: msg });
					});
				};

				createDir(folders);
			});
		}
	}, {
		key: 'rmdir',
		value: function rmdir(path, option) {

			return new Promise(function (resolve, reject) {
				FS.root.getDirectory(path, {}, function (dirEntry) {
					if (option.recursive) {
						dirEntry.removeRecursively(function () {
							resolve();
						}, function (err) {
							var msg = _ErrorHandler2.default.on(err, 'remove dir ' + path);
							reject({ err: err, msg: msg });
						});
					} else {
						dirEntry.remove(function () {
							resolve();
						}, function (err) {
							var msg = _ErrorHandler2.default.on(err, 'remove dir ' + path);
							reject({ err: err, msg: msg });
						});
					}
				});
			});
		}
	}, {
		key: 'writeFile',
		value: function writeFile() {
			var path = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
			var data = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];


			return new Promise(function (resolve, reject) {

				var onErr = function onErr(err) {
					var msg = _ErrorHandler2.default.on(err, 'write to file ' + path);
					reject({ err: err, msg: msg });
				};

				FS.root.getFile(path, { create: true }, function (fileEntry) {
					fileEntry.createWriter(function (fileWriter) {
						var bb = new Blob([data]);
						fileWriter.write(bb);

						fileWriter.length > data.length && setTimeout(function () {
							/*
        * If write data length is less than file length, the content beyond the length should be truncated
       */
							fileWriter.truncate(data.length);
						}, 10);

						fileWriter.onwriteend = function () {
							resolve();
						};

						fileWriter.onerror = onErr;
					}, onErr);
				}, onErr);
			});
		}
	}, {
		key: 'appendFile',
		value: function appendFile() {
			var path = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
			var data = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];


			return new Promise(function (resolve, reject) {
				var onErr = function onErr(err) {
					var msg = _ErrorHandler2.default.on(err, 'read from file ' + path);
					reject({ err: err, msg: msg });
				};

				FS.root.getFile(path, {}, function (fileEntry) {
					fileEntry.createWriter(function (fileWriter) {
						//Set write position at EOF
						fileWriter.seek(fileWriter.length);
						var bb = new Blob([data]);
						fileWriter.write(bb);

						fileWriter.onwriteend = function () {
							resolve();
						};

						fileWriter.onerror = onErr;
					}, onErr);
				}, onErr);
			});
		}
	}, {
		key: 'readFile',
		value: function readFile() {
			var path = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];


			return new Promise(function (resolve, reject) {

				var onErr = function onErr(err) {
					var msg = _ErrorHandler2.default.on(err, 'read from file ' + path);
					reject({ err: err, msg: msg });
				};

				FS.root.getFile(path, {}, function (fileEntry) {
					fileEntry.file(function (file) {
						var fr = new FileReader();
						fr.onloadend = function (e) {
							resolve(e.target.result);
						};
						fr.readAsText(file);
					}, onErr);
				}, onErr);
			});
		}
	}, {
		key: 'rmFile',
		value: function rmFile() {
			var path = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];


			return new Promise(function (resolve, reject) {

				var onErr = function onErr(err) {
					var msg = _ErrorHandler2.default.on(err, 'remove file ' + path);
					reject({ err: err, msg: msg });
				};

				FS.root.getFile(path, { create: false }, function (fileEntry) {
					fileEntry.remove(function () {
						resolve();
					}, onErr);
				}, onErr);
			});
		}
	}, {
		key: 'list',
		value: function list() {
			var path = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];


			return new Promise(function (resolve, reject) {

				var onErr = function onErr(err) {
					var msg = _ErrorHandler2.default.on(err, 'list entries under ' + path);
					reject({ err: err, msg: msg });
				};

				FS.root.getDirectory(path, {}, function (dirEntry) {
					var dirReader = dirEntry.createReader();
					var entries = [];

					var readEntries = function readEntries() {
						dirReader.readEntries(function (results) {
							if (!results.length) {
								resolve(entries);
							} else {
								entries = entries.concat(results);
								readEntries();
							}
						}, onErr);
					};

					readEntries();
				});
			});
		}
	}]);

	return fs;
}();

exports.default = fs;

//# sourceMappingURL=fs.js.map