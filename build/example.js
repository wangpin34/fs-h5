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
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.__RewireAPI__ = exports.__ResetDependency__ = exports.__set__ = exports.__Rewire__ = exports.__GetDependency__ = exports.__get__ = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _fs = __webpack_require__(2);
	
	var _fs2 = _interopRequireDefault(_fs);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	window.onload = function () {
	
		_get__('fs').requestQuota().then(function (bytes) {
			return _get__('fs').init(bytes, window.PERSISTENT);
		}).then(function () {
			_get__('fs').existsPath('a.td').then(function (exists) {
				console.log(exists);
			});
	
			_get__('fs').mkdir('/docs/files/').then(function (dirEntry) {
				console.log('Full path: ' + dirEntry.fullPath);
			});
	
			var list = function list() {
				_get__('fs').list('/').then(function (entries) {
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
	
				var title = document.getElementById('title').value;
				var text = document.getElementById('content').value;
	
				if (!title || !text) {
					alert('Please enter note title or content');
					return;
				}
	
				_get__('fs').writeFile(title, text).then(function () {
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
	var _RewiredData__ = {};
	var _RewireAPI__ = {};

	(function () {
		function addPropertyToAPIObject(name, value) {
			Object.defineProperty(_RewireAPI__, name, {
				value: value,
				enumerable: false,
				configurable: true
			});
		}

		addPropertyToAPIObject('__get__', _get__);
		addPropertyToAPIObject('__GetDependency__', _get__);
		addPropertyToAPIObject('__Rewire__', _set__);
		addPropertyToAPIObject('__set__', _set__);
		addPropertyToAPIObject('__reset__', _reset__);
		addPropertyToAPIObject('__ResetDependency__', _reset__);
		addPropertyToAPIObject('__with__', _with__);
	})();

	function _get__(variableName) {
		return _RewiredData__ === undefined || _RewiredData__[variableName] === undefined ? _get_original__(variableName) : _RewiredData__[variableName];
	}

	function _get_original__(variableName) {
		switch (variableName) {
			case 'fs':
				return _fs2.default;
		}

		return undefined;
	}

	function _assign__(variableName, value) {
		if (_RewiredData__ === undefined || _RewiredData__[variableName] === undefined) {
			return _set_original__(variableName, value);
		} else {
			return _RewiredData__[variableName] = value;
		}
	}

	function _set_original__(variableName, _value) {
		switch (variableName) {}

		return undefined;
	}

	function _update_operation__(operation, variableName, prefix) {
		var oldValue = _get__(variableName);

		var newValue = operation === '++' ? oldValue + 1 : oldValue - 1;

		_assign__(variableName, newValue);

		return prefix ? newValue : oldValue;
	}

	function _set__(variableName, value) {
		if ((typeof variableName === 'undefined' ? 'undefined' : _typeof(variableName)) === 'object') {
			Object.keys(variableName).forEach(function (name) {
				_RewiredData__[name] = variableName[name];
			});
		} else {
			return _RewiredData__[variableName] = value;
		}
	}

	function _reset__(variableName) {
		delete _RewiredData__[variableName];
	}

	function _with__(object) {
		var rewiredVariableNames = Object.keys(object);
		var previousValues = {};

		function reset() {
			rewiredVariableNames.forEach(function (variableName) {
				_RewiredData__[variableName] = previousValues[variableName];
			});
		}

		return function (callback) {
			rewiredVariableNames.forEach(function (variableName) {
				previousValues[variableName] = _RewiredData__[variableName];
				_RewiredData__[variableName] = object[variableName];
			});
			var result = callback();

			if (!!result && typeof result.then == 'function') {
				result.then(reset).catch(reset);
			} else {
				reset();
			}

			return result;
		};
	}

	exports.__get__ = _get__;
	exports.__GetDependency__ = _get__;
	exports.__Rewire__ = _set__;
	exports.__set__ = _set__;
	exports.__ResetDependency__ = _reset__;
	exports.__RewireAPI__ = _RewireAPI__;
	exports.default = _RewireAPI__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.__RewireAPI__ = exports.__ResetDependency__ = exports.__set__ = exports.__Rewire__ = exports.__GetDependency__ = exports.__get__ = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Constants = __webpack_require__(3);
	
	var _ErrorHandler = __webpack_require__(4);
	
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
				return _get__('initialized');
			}
		}, {
			key: 'requestQuota',
			value: function requestQuota() {
				var bytes = arguments.length <= 0 || arguments[0] === undefined ? _get__('Default').DEFAULT_SIZE : arguments[0];
	
				return new Promise(function (resolve, reject) {
					navigator.webkitPersistentStorage.requestQuota(bytes, function (grantBytes) {
						resolve(grantBytes);
					}, function (err) {
						var msg = _get__('ErrorHandler').on(err, 'request quota');
						reject({ err: err, msg: msg });
					});
				});
			}
		}, {
			key: 'init',
			value: function init() {
				var bytes = arguments.length <= 0 || arguments[0] === undefined ? _get__('DEFAULT_SIZE') : arguments[0];
				var type = arguments.length <= 1 || arguments[1] === undefined ? window.TEMPORARY : arguments[1];
	
	
				return new Promise(function (resolve, reject) {
					if (_get__('initializing')) return; //Make sure only one init is executing
					_assign__('initializing', true);
					_assign__('initialized', false);
	
					(window.requestFileSystem || window.webkitRequestFileSystem)(type, bytes, function (h5fs) {
						_assign__('FS', h5fs);
						_assign__('initializing', false);
						_assign__('initialized', true);
						resolve(h5fs);
					}, function (err) {
						var msg = _get__('ErrorHandler').on(err, 'init file system');
						reject({ err: err, msg: msg });
					});
				});
			}
		}, {
			key: 'existsPath',
			value: function existsPath() {
				var path = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	
	
				return Promise.all([new Promise(function (resolve, reject) {
					_get__('FS').root.getDirectory(path, {}, function (dirEntry) {
						resolve({ exists: true, dirEntry: dirEntry });
					}, function (err) {
						//Resovle as false if it is not found error or it is not a directory
						if (err.code === _get__('FileError').NOT_FOUND_ERR || err.code === _get__('FileError').TYPE_MISMATCH) {
							resolve({ exists: false });
						} else {
							var msg = _get__('ErrorHandler').on(err, 'check whether dir ' + path + ' exists');
							resolve({ msg: msg });
						}
					});
				}), new Promise(function (resolve, reject) {
					_get__('FS').root.getFile(path, {}, function (fileEntry) {
						resolve({ exists: true, fileEntry: fileEntry });
					}, function (err) {
						//Resovle as false if it is not found error
						if (err.code === _get__('FileError').NOT_FOUND_ERR || err.code === _get__('FileError').TYPE_MISMATCH) {
							resolve({ exists: false });
						} else {
							var msg = _get__('ErrorHandler').on(err, 'check whether file' + path + ' exists');
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
	
						var parent = dir || _get__('FS').root;
	
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
							var msg = _get__('ErrorHandler').on(err, 'create dir ' + path);
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
					_get__('FS').root.getDirectory(path, {}, function (dirEntry) {
						if (option.recursive) {
							dirEntry.removeRecursively(function () {
								resolve();
							}, function (err) {
								var msg = _get__('ErrorHandler').on(err, 'remove dir ' + path);
								reject({ err: err, msg: msg });
							});
						} else {
							dirEntry.remove(function () {
								resolve();
							}, function (err) {
								var msg = _get__('ErrorHandler').on(err, 'remove dir ' + path);
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
						var msg = _get__('ErrorHandler').on(err, 'write to file ' + path);
						reject({ err: err, msg: msg });
					};
	
					_get__('FS').root.getFile(path, { create: true }, function (fileEntry) {
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
						var msg = _get__('ErrorHandler').on(err, 'read from file ' + path);
						reject({ err: err, msg: msg });
					};
	
					_get__('FS').root.getFile(path, {}, function (fileEntry) {
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
				var _this = this;
	
				var path = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	
	
				return new Promise(function (resolve, reject) {
	
					var onErr = function onErr(err) {
						var msg = _get__('ErrorHandler').on(err, 'read from file ' + path);
						reject({ err: err, msg: msg });
					};
	
					_get__('FS').root.getFile(path, {}, function (fileEntry) {
						fileEntry.file(function (file) {
							var fr = new FileReader();
							fr.onloadend = function (e) {
								resolve(_this.result);
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
						var msg = _get__('ErrorHandler').on(err, 'remove file ' + path);
						reject({ err: err, msg: msg });
					};
	
					_get__('FS').root.getFile(path, { create: false }, function (fileEntry) {
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
						var msg = _get__('ErrorHandler').on(err, 'list entries under ' + path);
						reject({ err: err, msg: msg });
					};
	
					_get__('FS').root.getDirectory(path, {}, function (dirEntry) {
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
	var _RewiredData__ = {};
	var _RewireAPI__ = {};
	
	(function () {
		function addPropertyToAPIObject(name, value) {
			Object.defineProperty(_RewireAPI__, name, {
				value: value,
				enumerable: false,
				configurable: true
			});
		}
	
		addPropertyToAPIObject('__get__', _get__);
		addPropertyToAPIObject('__GetDependency__', _get__);
		addPropertyToAPIObject('__Rewire__', _set__);
		addPropertyToAPIObject('__set__', _set__);
		addPropertyToAPIObject('__reset__', _reset__);
		addPropertyToAPIObject('__ResetDependency__', _reset__);
		addPropertyToAPIObject('__with__', _with__);
	})();
	
	function _get__(variableName) {
		return _RewiredData__ === undefined || _RewiredData__[variableName] === undefined ? _get_original__(variableName) : _RewiredData__[variableName];
	}
	
	function _get_original__(variableName) {
		switch (variableName) {
			case 'initialized':
				return initialized;
	
			case 'Default':
				return _Constants.Default;
	
			case 'ErrorHandler':
				return _ErrorHandler2.default;
	
			case 'DEFAULT_SIZE':
				return DEFAULT_SIZE;
	
			case 'initializing':
				return initializing;
	
			case 'FS':
				return FS;
	
			case 'FileError':
				return _Constants.FileError;
		}
	
		return undefined;
	}
	
	function _assign__(variableName, value) {
		if (_RewiredData__ === undefined || _RewiredData__[variableName] === undefined) {
			return _set_original__(variableName, value);
		} else {
			return _RewiredData__[variableName] = value;
		}
	}
	
	function _set_original__(variableName, _value) {
		switch (variableName) {
			case 'initializing':
				return initializing = _value;
	
			case 'initialized':
				return initialized = _value;
	
			case 'FS':
				return FS = _value;
		}
	
		return undefined;
	}
	
	function _update_operation__(operation, variableName, prefix) {
		var oldValue = _get__(variableName);
	
		var newValue = operation === '++' ? oldValue + 1 : oldValue - 1;
	
		_assign__(variableName, newValue);
	
		return prefix ? newValue : oldValue;
	}
	
	function _set__(variableName, value) {
		if ((typeof variableName === 'undefined' ? 'undefined' : _typeof(variableName)) === 'object') {
			Object.keys(variableName).forEach(function (name) {
				_RewiredData__[name] = variableName[name];
			});
		} else {
			return _RewiredData__[variableName] = value;
		}
	}
	
	function _reset__(variableName) {
		delete _RewiredData__[variableName];
	}
	
	function _with__(object) {
		var rewiredVariableNames = Object.keys(object);
		var previousValues = {};
	
		function reset() {
			rewiredVariableNames.forEach(function (variableName) {
				_RewiredData__[variableName] = previousValues[variableName];
			});
		}
	
		return function (callback) {
			rewiredVariableNames.forEach(function (variableName) {
				previousValues[variableName] = _RewiredData__[variableName];
				_RewiredData__[variableName] = object[variableName];
			});
			var result = callback();
	
			if (!!result && typeof result.then == 'function') {
				result.then(reset).catch(reset);
			} else {
				reset();
			}
	
			return result;
		};
	}
	
	var _typeOfOriginalExport = typeof fs === 'undefined' ? 'undefined' : _typeof(fs);
	
	function addNonEnumerableProperty(name, value) {
		Object.defineProperty(fs, name, {
			value: value,
			enumerable: false,
			configurable: true
		});
	}
	
	if ((_typeOfOriginalExport === 'object' || _typeOfOriginalExport === 'function') && Object.isExtensible(fs)) {
		addNonEnumerableProperty('__get__', _get__);
		addNonEnumerableProperty('__GetDependency__', _get__);
		addNonEnumerableProperty('__Rewire__', _set__);
		addNonEnumerableProperty('__set__', _set__);
		addNonEnumerableProperty('__reset__', _reset__);
		addNonEnumerableProperty('__ResetDependency__', _reset__);
		addNonEnumerableProperty('__with__', _with__);
		addNonEnumerableProperty('__RewireAPI__', _RewireAPI__);
	}

	exports.__get__ = _get__;
	exports.__GetDependency__ = _get__;
	exports.__Rewire__ = _set__;
	exports.__set__ = _set__;
	exports.__ResetDependency__ = _reset__;
	exports.__RewireAPI__ = _RewireAPI__;

/***/ },
/* 3 */
/***/ function(module, exports) {

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

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.__RewireAPI__ = exports.__ResetDependency__ = exports.__set__ = exports.__Rewire__ = exports.__GetDependency__ = exports.__get__ = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Constants = __webpack_require__(3);
	
	var _Logger = __webpack_require__(5);
	
	var _Logger2 = _interopRequireDefault(_Logger);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var errorLogger = _get__('Logger').newInstance({
	  prefix: 'File System error',
	  type: _get__('Default').ERROR
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
	        case _get__('FileError').QUOTA_EXCEEDED_ERR:
	          msg = 'Request quoto exceeded';
	          break;
	        case _get__('FileError').NOT_FOUND_ERR:
	          msg = 'Request path not found';
	          break;
	        case _get__('FileError').SECURITY_ERR:
	          msg = 'Secerity error occoars';
	          break;
	        case _get__('FileError').INVALID_MODIFICATION_ERR:
	          msg = 'Invalid modification occurs';
	          break;
	        case _get__('FileError').INVALID_STATE_ERR:
	          msg = 'Invalide state error occurs ';
	          break;
	        default:
	          msg = 'An unknow error occurs, please contact dmoneh@163.com for help';
	          break;
	      }
	      msg += ' when ' + action;
	      _get__('errorLogger').log(msg);
	      return msg;
	    }
	  }]);
	
	  return ErrorHandler;
	}();
	
	exports.default = ErrorHandler;
	var _RewiredData__ = {};
	var _RewireAPI__ = {};
	
	(function () {
	  function addPropertyToAPIObject(name, value) {
	    Object.defineProperty(_RewireAPI__, name, {
	      value: value,
	      enumerable: false,
	      configurable: true
	    });
	  }
	
	  addPropertyToAPIObject('__get__', _get__);
	  addPropertyToAPIObject('__GetDependency__', _get__);
	  addPropertyToAPIObject('__Rewire__', _set__);
	  addPropertyToAPIObject('__set__', _set__);
	  addPropertyToAPIObject('__reset__', _reset__);
	  addPropertyToAPIObject('__ResetDependency__', _reset__);
	  addPropertyToAPIObject('__with__', _with__);
	})();
	
	function _get__(variableName) {
	  return _RewiredData__ === undefined || _RewiredData__[variableName] === undefined ? _get_original__(variableName) : _RewiredData__[variableName];
	}
	
	function _get_original__(variableName) {
	  switch (variableName) {
	    case 'Logger':
	      return _Logger2.default;
	
	    case 'Default':
	      return _Constants.Default;
	
	    case 'FileError':
	      return _Constants.FileError;
	
	    case 'errorLogger':
	      return errorLogger;
	  }
	
	  return undefined;
	}
	
	function _assign__(variableName, value) {
	  if (_RewiredData__ === undefined || _RewiredData__[variableName] === undefined) {
	    return _set_original__(variableName, value);
	  } else {
	    return _RewiredData__[variableName] = value;
	  }
	}
	
	function _set_original__(variableName, _value) {
	  switch (variableName) {}
	
	  return undefined;
	}
	
	function _update_operation__(operation, variableName, prefix) {
	  var oldValue = _get__(variableName);
	
	  var newValue = operation === '++' ? oldValue + 1 : oldValue - 1;
	
	  _assign__(variableName, newValue);
	
	  return prefix ? newValue : oldValue;
	}
	
	function _set__(variableName, value) {
	  if ((typeof variableName === 'undefined' ? 'undefined' : _typeof(variableName)) === 'object') {
	    Object.keys(variableName).forEach(function (name) {
	      _RewiredData__[name] = variableName[name];
	    });
	  } else {
	    return _RewiredData__[variableName] = value;
	  }
	}
	
	function _reset__(variableName) {
	  delete _RewiredData__[variableName];
	}
	
	function _with__(object) {
	  var rewiredVariableNames = Object.keys(object);
	  var previousValues = {};
	
	  function reset() {
	    rewiredVariableNames.forEach(function (variableName) {
	      _RewiredData__[variableName] = previousValues[variableName];
	    });
	  }
	
	  return function (callback) {
	    rewiredVariableNames.forEach(function (variableName) {
	      previousValues[variableName] = _RewiredData__[variableName];
	      _RewiredData__[variableName] = object[variableName];
	    });
	    var result = callback();
	
	    if (!!result && typeof result.then == 'function') {
	      result.then(reset).catch(reset);
	    } else {
	      reset();
	    }
	
	    return result;
	  };
	}
	
	var _typeOfOriginalExport = typeof ErrorHandler === 'undefined' ? 'undefined' : _typeof(ErrorHandler);
	
	function addNonEnumerableProperty(name, value) {
	  Object.defineProperty(ErrorHandler, name, {
	    value: value,
	    enumerable: false,
	    configurable: true
	  });
	}
	
	if ((_typeOfOriginalExport === 'object' || _typeOfOriginalExport === 'function') && Object.isExtensible(ErrorHandler)) {
	  addNonEnumerableProperty('__get__', _get__);
	  addNonEnumerableProperty('__GetDependency__', _get__);
	  addNonEnumerableProperty('__Rewire__', _set__);
	  addNonEnumerableProperty('__set__', _set__);
	  addNonEnumerableProperty('__reset__', _reset__);
	  addNonEnumerableProperty('__ResetDependency__', _reset__);
	  addNonEnumerableProperty('__with__', _with__);
	  addNonEnumerableProperty('__RewireAPI__', _RewireAPI__);
	}

	exports.__get__ = _get__;
	exports.__GetDependency__ = _get__;
	exports.__Rewire__ = _set__;
	exports.__set__ = _set__;
	exports.__ResetDependency__ = _reset__;
	exports.__RewireAPI__ = _RewireAPI__;

/***/ },
/* 5 */
/***/ function(module, exports) {

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
				return new (_get__('Logger'))(opt);
			}
		}]);
	
		return Logger;
	}();
	
	exports.default = Logger;
	var _RewiredData__ = {};
	var _RewireAPI__ = {};
	
	(function () {
		function addPropertyToAPIObject(name, value) {
			Object.defineProperty(_RewireAPI__, name, {
				value: value,
				enumerable: false,
				configurable: true
			});
		}
	
		addPropertyToAPIObject('__get__', _get__);
		addPropertyToAPIObject('__GetDependency__', _get__);
		addPropertyToAPIObject('__Rewire__', _set__);
		addPropertyToAPIObject('__set__', _set__);
		addPropertyToAPIObject('__reset__', _reset__);
		addPropertyToAPIObject('__ResetDependency__', _reset__);
		addPropertyToAPIObject('__with__', _with__);
	})();
	
	function _get__(variableName) {
		return _RewiredData__ === undefined || _RewiredData__[variableName] === undefined ? _get_original__(variableName) : _RewiredData__[variableName];
	}
	
	function _get_original__(variableName) {
		switch (variableName) {
			case 'Logger':
				return Logger;
		}
	
		return undefined;
	}
	
	function _assign__(variableName, value) {
		if (_RewiredData__ === undefined || _RewiredData__[variableName] === undefined) {
			return _set_original__(variableName, value);
		} else {
			return _RewiredData__[variableName] = value;
		}
	}
	
	function _set_original__(variableName, _value) {
		switch (variableName) {}
	
		return undefined;
	}
	
	function _update_operation__(operation, variableName, prefix) {
		var oldValue = _get__(variableName);
	
		var newValue = operation === '++' ? oldValue + 1 : oldValue - 1;
	
		_assign__(variableName, newValue);
	
		return prefix ? newValue : oldValue;
	}
	
	function _set__(variableName, value) {
		if ((typeof variableName === 'undefined' ? 'undefined' : _typeof(variableName)) === 'object') {
			Object.keys(variableName).forEach(function (name) {
				_RewiredData__[name] = variableName[name];
			});
		} else {
			return _RewiredData__[variableName] = value;
		}
	}
	
	function _reset__(variableName) {
		delete _RewiredData__[variableName];
	}
	
	function _with__(object) {
		var rewiredVariableNames = Object.keys(object);
		var previousValues = {};
	
		function reset() {
			rewiredVariableNames.forEach(function (variableName) {
				_RewiredData__[variableName] = previousValues[variableName];
			});
		}
	
		return function (callback) {
			rewiredVariableNames.forEach(function (variableName) {
				previousValues[variableName] = _RewiredData__[variableName];
				_RewiredData__[variableName] = object[variableName];
			});
			var result = callback();
	
			if (!!result && typeof result.then == 'function') {
				result.then(reset).catch(reset);
			} else {
				reset();
			}
	
			return result;
		};
	}
	
	var _typeOfOriginalExport = typeof Logger === 'undefined' ? 'undefined' : _typeof(Logger);
	
	function addNonEnumerableProperty(name, value) {
		Object.defineProperty(Logger, name, {
			value: value,
			enumerable: false,
			configurable: true
		});
	}
	
	if ((_typeOfOriginalExport === 'object' || _typeOfOriginalExport === 'function') && Object.isExtensible(Logger)) {
		addNonEnumerableProperty('__get__', _get__);
		addNonEnumerableProperty('__GetDependency__', _get__);
		addNonEnumerableProperty('__Rewire__', _set__);
		addNonEnumerableProperty('__set__', _set__);
		addNonEnumerableProperty('__reset__', _reset__);
		addNonEnumerableProperty('__ResetDependency__', _reset__);
		addNonEnumerableProperty('__with__', _with__);
		addNonEnumerableProperty('__RewireAPI__', _RewireAPI__);
	}

	exports.__get__ = _get__;
	exports.__GetDependency__ = _get__;
	exports.__Rewire__ = _set__;
	exports.__set__ = _set__;
	exports.__ResetDependency__ = _reset__;
	exports.__RewireAPI__ = _RewireAPI__;

/***/ }
/******/ ]);
//# sourceMappingURL=example.js.map