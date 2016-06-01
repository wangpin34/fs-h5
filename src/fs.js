import { Default, FileError } from './Constants'
import ErrorHandler from './ErrorHandler'

const DEFAULT_SIZE = 10 * 1024 * 1024
let FS = null
let initialized = false
let initializing = false
	
export default class fs {

	constructor() {

	}

	static isInitialized() {
		return initialized
	}

	static requestQuota(bytes=Default.DEFAULT_SIZE) {
		return new Promise((resolve, reject) => {
			(window.navigator.webkitPersistentStorage.requestQuota || window.webkitStorageInfo.requestQuota)(window.PERSISTENT, bytes, resolve, err => {
				let msg = ErrorHandler.handle(err, 'request quota')
				reject({err, msg})
			})
		})
	}

	static init(bytes=DEFAULT_SIZE, type = window.TEMPORARY) {

		return new Promise((resolve, reject) => {
			if(initializing) return; //Make sure only one init is executing
			initializing = true;
			initialized = false;

			(window.requestFileSystem || window.webkitRequestFileSystem)(type, bytes, h5fs => {
				FS = h5fs;
				initializing = false;
				initialized = true;
				resolve(h5fs)
			}, err => {
				let msg = ErrorHandler.on(err, 'init file system')
				reject({err, msg})
			})
		})

	}

	static existsPath(path = '') {

		return Promise.all(
			[
				new Promise((resolve, reject) => {
					FS.root.getDirectory(path, {}, (dirEntry) => {
						resolve({exists:true, dirEntry})
					}, err => {
						//Resovle as false if it is not found error
						if(err.code === FileError.NOT_FOUND_ERR) {
							resolve({exists:false})
						}else{
							let msg = ErrorHandler.on(err, 'check whether dir ' + path + ' exists')
							resolve({msg})
						}
					})
				}),

				new Promise((resolve, reject) => {
					FS.root.getFile(path, {}, fileEntry => {
						resolve({exists:true, fileEntry})
					}, err => {
						//Resovle as false if it is not found error
						if(err.code === FileError.NOT_FOUND_ERR) {
							resolve({exists:false})
						}else{
							let msg = ErrorHandler.on(err, 'check whether file' + path + ' exists')
							resolve({msg})
						}
					})

				})
			]).then([ret1, ret2] => {
				if( ret1.exists || ret2.exists){
					return true
				}else if( ret1.exists === false || ret2.exists === false){
					return false
				}else{
					throw new Error(ret1.msg + ' ' + ret2.msg)
				}
			})

	}

	static mkdir(path = '') {

		return new Promise((resolve, reject) => {

			let folders = path.split('/').filter(e => {
				return e !== '' && e !== '.'
			})

			let createDir = (folders, dir) => {  

			    let parent = dir || FS.root

				  // Throw out './' or '/' and move on to prevent something like '/foo/.//bar'.  
				  if (folders[0] == '.' || folders[0] == '') {  
				    folders = folders.slice(1)
				  }

				  parent.getDirectory(folders[0], {create: true}, dirEntry=>{  
				    // Recursively add the new subfolder (if we still have another to create).  
				    if (folders.length > 1) {  
				      	createDir(folders.slice(1), dirEntry)  
				    } else{
			    		resolve(dirEntry)
				    }
				  }, err => {
				  	let msg = ErrorHandler.on(err, 'create dir ' + path)
				  	reject({err, msg})
				  }) 
			};  

			createDir(folders);	

		})
		
	}

	static rmdir (path, option) {

		return new Promise((resolve, reject) => {
			FS.root.getDirectory(path, {}, dirEntry => {
				if(option.recursive){
					dirEntry.removeRecursively(() => {
						resolve()
					}, err => {
				  	let msg = ErrorHandler.on(err, 'remove dir ' + path)
				  	reject({err, msg})
				  })
				}else{
					dirEntry.remove(() => {
						resolve()
					}, err => {
				  	let msg = ErrorHandler.on(err, 'remove dir ' + path)
				  	reject({err, msg})
				  })
				}
			})
		})
			
	}

	static writeFile(path = '', data = '') {

		return new Promise((resolve, reject) => {

			let onErr = err => {
				let msg = ErrorHandler.on(err, 'write to file ' + path)
				reject({err, msg})
			}

			FS.root.getFile(path, {create: true}, fileEntry => {
				fileEntry.createWriter(fileWriter => {
					let bb = new Blob([data]);
			  		fileWriter.write(bb)

			  		fileWriter.length>data.length && setTimeout(() => {
			  			/*
			  			 * If write data length is less than file length, the content beyond the length should be truncated
						 */
			  			fileWriter.truncate(data.length)
			  		},10)

			  		fileWriter.onwriteend = err => {
			  			if(err){
			  				onErr(err)
			  			}else{
			  				resolve()
			  			}
			  		}

			  		fileWriter.onerror = onErr

				}, onErr)
			}, onErr)

		})
		
	}

	static appendFile(path = '', data = '') {

		return new Promise((resolve, reject) => {
			let onErr = err => {
				let msg = ErrorHandler.on(err, 'read from file ' + path)
				reject({err, msg})
			}

			FS.root.getFile(path, {}, fileEntry => {
				fileEntry.createWriter( fileWriter => {
					//Set write position at EOF
					fileWriter.seek(fileWriter.length)
					let bb = new Blob([data])
					fileWriter.write(bb)

					fileWriter.onwriteend = err => {
			  			if(err){
			  				onErr(err)
			  			}else{
			  				resolve()
			  			}
			  		}

			  		fileWriter.onerror = onErr

				}, onErr)
			}, onErr)
		})
	}

	static readFile(path = '') {

		return new Promise((resolve, reject) => {

			let onErr = err => {
				let msg = ErrorHandler.on(err, 'read from file ' + path)
				reject({err, msg})
			}

			FS.root.getFile(path, {}, fileEntry => {
				fileEntry.file(file => {
					let fr = new FileReader()  
			       	fr.onloadend = e => {  
			         	resolve(this.result)
			       	}
			       	fr.readAsText(file)
				}, onErr)
			}, onErr)
		})
		
	}

	static rmFile(path = '') {

		return new Promise((resolve, reject) => {

			let onErr = err => {
				let msg = ErrorHandler.on(err, 'remove file ' + path)
				reject({err, msg})
			}

			FS.root.getFile(path, {create: false}, fileEntry => {
				fileEntry.remove(() => {  
			      resolve()
			    }, onErr)
			}, onErr)
		})
		
	}

	static list(path = '') {

		return new Promise((resolve, reject) => {

			let onErr = err => {
				let msg = ErrorHandler.on(err, 'list entries under ' + path)
				reject({err, msg})
			}

			FS.root.getDirectory(path, {}, dirEntry => {
				let dirReader = dirEntry.createReader()
				let entries = []

				let readEntries = () => {
					dirReader.readEntries( results => {
						if(!results.length){
							resolve(entries)
						}else{
							entries = entries.concat(results)
							readEntries()
						}
					},onErr)
				}
			
				readEntries()
			})
		})
		
	}
}
