/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
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

	'use strict';
	
	var _fs = __webpack_require__(2);
	
	var _fs2 = _interopRequireDefault(_fs);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	window.onload = function () {
	
		_fs2.default.init(10 * 10 * 1024, function () {
	
			_fs2.default.existsFile('a.td', function (err, exists) {
				console.log(exists);
			});
	
			_fs2.default.mkdir('/docs/files/', function (err, dirEntry) {
	
				console.log('/docs/files/ created successfully');
	
				_fs2.default.rmdir('/docs', { recursive: true }, function () {
					console.log('/docs/ removed successfully');
				});
			});
	
			var list = function list() {
				_fs2.default.list('/', function (err, entries) {
					var files = entries.filter(function (entry) {
						return entry.isFile;
					});
	
					var articles = document.getElementById('articles');
					articles.innerHTML = ''; // Remove children
	
					var content = files.map(function (file) {
						var name = file.name;
						return '<li>' + name + '</li>';
					}).join('');
	
					articles.innerHTML = content;
				});
			};
	
			list();
	
			var saveBtn = document.getElementById('saveBtn');
	
			saveBtn.addEventListener('click', function (event) {
				event.stopPropagation();
				event.preventDefault();
	
				var title = document.getElementById('title').value,
				    text = document.getElementById('content').value;
	
				if (!title || !text) {
					alert('Please enter note title or content');
					return;
				}
	
				_fs2.default.writeFile(title, text, function (err) {
					alert('save ' + title + ' successfully');
					list();
				});
			});
	
			var clearBtn = document.getElementById('clearBtn');
	
			clearBtn.addEventListener('click', function (event) {
				event.stopPropagation();
				event.preventDefault();
				document.getElementById('title').value = '';
				document.getElementById('content').value = '';
			});
		});
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _ErrorHandler = __webpack_require__(3);
	
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
			key: 'isInitialized',
			value: function isInitialized() {
				return initialized;
			}
		}, {
			key: 'init',
			value: function init() {
				var bytes = arguments.length <= 0 || arguments[0] === undefined ? DEFAULT_SIZE : arguments[0];
				var callback = arguments.length <= 1 || arguments[1] === undefined ? function () {} : arguments[1];
	
				if (initializing) return; //Make sure only one init is executing
				initializing = true;
				initialized = false;
				navigator.webkitPersistentStorage.requestQuota(bytes, function (grantBytes) {
	
					(window.requestFileSystem || window.webkitRequestFileSystem)(window.PERSISTENT, grantBytes, function (h5fs) {
						FS = h5fs;
						initializing = false;
						initialized = true;
						callback(null, h5fs);
					}, _ErrorHandler2.default.generate('init file system', callback));
				});
			}
		}, {
			key: 'existsDir',
			value: function existsDir(path) {
				var callback = arguments.length <= 1 || arguments[1] === undefined ? function () {} : arguments[1];
	
	
				var handler = function handler(err, callback) {
					if (err.code === FileError.NOT_FOUND_ERR) {
						callback(null, false);
					} else {
						_ErrorHandler2.default.generate('Make dir ' + path, callback);
					}
				};
	
				FS.root.getDirectory(path, {}, function (direntry) {
					callback(null, true);
				}, function (err) {
					handler(err, callback);
				});
			}
		}, {
			key: 'existsFile',
			value: function existsFile(path) {
				var callback = arguments.length <= 1 || arguments[1] === undefined ? function () {} : arguments[1];
	
				var handler = function handler(err, callback) {
					if (err.code === FileError.NOT_FOUND_ERR) {
						callback(null, false);
					} else {
						_ErrorHandler2.default.generate('Make dir ' + path, callback);
					}
				};
	
				FS.root.getFile(path, {}, function (direntry) {
					callback(null, true);
				}, function (err) {
					handler(err, callback);
				});
			}
		}, {
			key: 'mkdir',
			value: function mkdir(path) {
				var callback = arguments.length <= 1 || arguments[1] === undefined ? function () {} : arguments[1];
	
	
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
							callback(null, dirEntry);
						}
					}, _ErrorHandler2.default.generate('Make dir ' + path, callback));
				};
	
				createDir(folders);
			}
		}, {
			key: 'rmdir',
			value: function rmdir(path, option) {
				var callback = arguments.length <= 2 || arguments[2] === undefined ? function () {} : arguments[2];
	
				FS.root.getDirectory(path, {}, function (dirEntry) {
					if (option.recursive) {
						dirEntry.removeRecursively(function () {
							callback(null);
						}, _ErrorHandler2.default.generate('Remove dir ' + path, callback));
					} else {
						dirEntry.remove(function () {
							callback(null);
						}, _ErrorHandler2.default.generate('Remove dir ' + path, callback));
					}
				});
			}
		}, {
			key: 'writeFile',
			value: function writeFile(path, data) {
				var callback = arguments.length <= 2 || arguments[2] === undefined ? function () {} : arguments[2];
	
				FS.root.getFile(path, { create: true }, function (fileEntry) {
					fileEntry.createWriter(function (fileWriter) {
						var bb = new Blob([data], { type: 'text/plain' });
						fileWriter.write(bb);
	
						fileWriter.length > data.length && setTimeout(function () {
							//Truncate file if current content size less than previous
							fileWriter.truncate(data.length);
						}, 10);
	
						callback(null);
					}, _ErrorHandler2.default.generate('Write to file ' + path, callback));
				}, _ErrorHandler2.default.generate('Search file ' + path, callback));
			}
		}, {
			key: 'readFile',
			value: function readFile(path, callback) {
				var _this = this;
	
				FS.root.getFile(path, { create: false }, function (fileEntry) {
					fileEntry.file(function (file) {
						var fr = new FileReader();
						fr.onloadend = function (e) {
							callback(null, _this.result);
						};
						fr.readAsText(file);
					}, _ErrorHandler2.default.generate('Read file ' + path, callback));
				}, _ErrorHandler2.default.generate('Search file ' + path, callback));
			}
		}, {
			key: 'rmFile',
			value: function rmFile(path) {
				var callback = arguments.length <= 1 || arguments[1] === undefined ? function () {} : arguments[1];
	
				FS.root.getFile(path, { create: false }, function (fileEntry) {
					fileEntry.remove(function () {
						console.log('File removed.');
						callback(null);
					}, _ErrorHandler2.default.generate('Remove file ' + path, callback));
				}, _ErrorHandler2.default.generate('Search file ' + path, callback));
			}
		}, {
			key: 'list',
			value: function list(path) {
				var callback = arguments.length <= 1 || arguments[1] === undefined ? function () {} : arguments[1];
	
				FS.root.getDirectory(path, {}, function (dirEntry) {
					var dirReader = dirEntry.createReader();
					var entries = [];
					var readEntries = function readEntries() {
						dirReader.readEntries(function (results) {
							if (!results.length) {
								callback(null, entries);
							} else {
								entries = entries.concat(results);
								readEntries();
							}
						}, _ErrorHandler2.default.generate('List entries in directory' + path, callback));
					};
	
					readEntries();
				});
			}
		}]);
	
		return fs;
	}();
	
	exports.default = fs;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ErrorHandler = function () {
		function ErrorHandler() {
			_classCallCheck(this, ErrorHandler);
		}
	
		_createClass(ErrorHandler, null, [{
			key: 'generate',
			value: function generate() {
				var _this = this;
	
				var prefix = arguments.length <= 0 || arguments[0] === undefined ? 'Error' : arguments[0];
				var callback = arguments.length <= 1 || arguments[1] === undefined ? function (err) {} : arguments[1];
	
				return function (e) {
					var msg = '';
	
					switch (e.code) {
						case FileError.QUOTA_EXCEEDED_ERR:
							msg = 'QUOTA_EXCEEDED_ERR';
							break;
						case FileError.NOT_FOUND_ERR:
							msg = 'NOT_FOUND_ERR';
							break;
						case FileError.SECURITY_ERR:
							msg = 'SECURITY_ERR';
							break;
						case FileError.INVALID_MODIFICATION_ERR:
							msg = 'INVALID_MODIFICATION_ERR';
							break;
						case FileError.INVALID_STATE_ERR:
							msg = 'INVALID_STATE_ERR';
							break;
						default:
							msg = 'Unknown Error';
							break;
					}
					_this.logger(prefix + ' / ' + msg, 'error');
					callback(new Error(msg));
				};
			}
		}, {
			key: 'logger',
			value: function logger() {
				var msg = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
				var type = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
	
				switch (type) {
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
		}]);
	
		return ErrorHandler;
	}();
	
	exports.default = ErrorHandler;

/***/ }
/******/ ]);
//# sourceMappingURL=example.js.map