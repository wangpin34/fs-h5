/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var fs = __webpack_require__(2)



/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var Default = exports.Default = Object.freeze({
		DEFAULT_SIZE: 10 * 1024 * 1024,
		ROOT: '/',
		ERROR: 'error'
	});

	var FileError = exports.FileError = Object.freeze({
		QUOTA_EXCEEDED_ERR: 10,
		NOT_FOUND_ERR: 1,
		SECURITY_ERR: 2,
		INVALID_MODIFICATION_ERR: 9,
		INVALID_STATE_ERR: 7,
		TYPE_MISMATCH: 11
	});
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Constants = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./Constants\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	var _Logger = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./Logger\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	var _Logger2 = _interopRequireDefault(_Logger);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var errorLogger = _Logger2.default.newInstance({
	  prefix: 'File System error',
	  type: _Constants.Default.ERROR
	});

	var ErrorHandler = function () {
	  function ErrorHandler() {
	    _classCallCheck(this, ErrorHandler);
	  }

	  _createClass(ErrorHandler, null, [{
	    key: 'on',
	    value: function on(error, action) {

	      var msg = '';

	      switch (error.code) {
	        case _Constants.FileError.QUOTA_EXCEEDED_ERR:
	          msg = 'Request quoto exceeded';
	          break;
	        case _Constants.FileError.NOT_FOUND_ERR:
	          msg = 'Request path not found';
	          break;
	        case _Constants.FileError.SECURITY_ERR:
	          msg = 'Secerity error occoars';
	          break;
	        case _Constants.FileError.INVALID_MODIFICATION_ERR:
	          msg = 'Invalid modification occurs';
	          break;
	        case _Constants.FileError.INVALID_STATE_ERR:
	          msg = 'Invalide state error occurs ';
	          break;
	        default:
	          msg = 'An unknow error occurs, please contact dmoneh@163.com for help';
	          break;
	      }
	      msg += ' when ' + action;
	      errorLogger.log(msg);
	      return msg;
	    }
	  }]);

	  return ErrorHandler;
	}();

	exports.default = ErrorHandler;
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Constants = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./Constants\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	var _ErrorHandler = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./ErrorHandler\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

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
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Logger = function () {
		function Logger(_ref) {
			var _ref$prefix = _ref.prefix;
			var prefix = _ref$prefix === undefined ? 'Error' : _ref$prefix;
			var type = _ref.type;

			_classCallCheck(this, Logger);

			this.prefix = prefix;
			this.type = type;
		}

		_createClass(Logger, [{
			key: 'log',
			value: function log(msg) {
				if ((typeof msg === 'undefined' ? 'undefined' : _typeof(msg)) === 'object') {
					msg = JSON.stringify(msg, null, 4);
				}

				switch (this.type) {
					case 'info':
						console.info(msg);break;
					case 'warn':
						console.warn(msg);break;
					case 'error':
						console.error(msg);break;
					default:
						console.log(msg);
				}
			}
		}], [{
			key: 'newInstance',
			value: function newInstance(opt) {
				return new Logger(opt);
			}
		}]);

		return Logger;
	}();

	exports.default = Logger;
	//# sourceMappingURL=fs.js.map


/***/ }
/******/ ]);