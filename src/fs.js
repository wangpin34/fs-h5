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

	static init(bytes=DEFAULT_SIZE, callback=()=>{}) {
		if(initializing) return; //Make sure only one init is executing
		initializing = true;
		initialized = false;
		window.navigator.webkitPersistentStorage.requestQuota(bytes, grantBytes => {

			(window.requestFileSystem || window.webkitRequestFileSystem)
			(window.PERSISTENT, grantBytes, h5fs => {
				FS = h5fs;
				initializing = false;
				initialized = true;
				callback(null, h5fs)
			}, ErrorHandler.generate('init file system', callback))

		})
	}

	static existsDir(path, callback=()=>{}) {

		let handler = (err, callback) => {
			if(err.code === FileError.NOT_FOUND_ERR){
				callback(null, false)	
			} else {
				ErrorHandler.generate('Make dir ' + path, callback)
			}
		}

		FS.root.getDirectory(path, {}, direntry => {
			callback(null, true)
		}, err => {handler(err, callback)})
	}

	static existsFile(path, callback=()=>{}) {
		let handler = (err, callback) => {
			if(err.code === FileError.NOT_FOUND_ERR){
				callback(null, false)	
			} else {
				ErrorHandler.generate('Make dir ' + path, callback)
			}
		}

		FS.root.getFile(path, {}, direntry => {
			callback(null, true)
		}, err => {handler(err, callback)})
	}

	static mkdir(path, callback=()=>{}) {
			
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
		    		callback(null, dirEntry)
			    }
			  }, ErrorHandler.generate('Make dir ' + path, callback)) 
		};  

		createDir(folders);	
		
	}

	static rmdir (path, option, callback=()=>{}) {
			FS.root.getDirectory(path, {}, dirEntry => {
				if(option.recursive){
					dirEntry.removeRecursively(() => {
						callback(null);
					}, ErrorHandler.generate('Remove dir ' + path, callback))
				}else{
					dirEntry.remove(() => {
						callback(null);
					}, ErrorHandler.generate('Remove dir ' + path, callback))
				}
			})
	}

	static writeFile(path, data, callback=()=>{}) {
		FS.root.getFile(path, {create: true}, fileEntry => {
			fileEntry.createWriter(fileWriter => {
				let bb = new Blob([data],{type:'text/plain'});
		  		fileWriter.write(bb);

		  		fileWriter.length>data.length && setTimeout(() => {
		  			//Truncate file if current content size less than previous
		  			fileWriter.truncate(data.length);
		  		},10)

		  		callback(null);

			}, ErrorHandler.generate('Write to file ' + path, callback))
		}, ErrorHandler.generate('Search file ' + path, callback))
	}

	static readFile(path, callback) {
		FS.root.getFile(path, {create: false}, fileEntry => {
			fileEntry.file(file => {
				let fr = new FileReader()  
		       	fr.onloadend = e => {  
		         	callback(null, this.result)
		       	}
		       	fr.readAsText(file)
			}, ErrorHandler.generate('Read file ' + path, callback))
		}, ErrorHandler.generate('Search file ' + path, callback))
	}

	static rmFile(path, callback=()=>{}) {
		FS.root.getFile(path, {create: false}, fileEntry => {
			fileEntry.remove(() => {  
		      console.log('File removed.')
		      callback(null)
		    }, ErrorHandler.generate('Remove file ' + path, callback)); 
		}, ErrorHandler.generate('Search file ' + path, callback))
	}

	static list(path, callback=()=>{}) {
		FS.root.getDirectory(path, {}, dirEntry => {
			let dirReader = dirEntry.createReader()
			let entries = []
			let readEntries = () => {
				dirReader.readEntries( results => {
					if(!results.length){
						callback(null, entries)
					}else{
						entries = entries.concat(results)
						readEntries()
					}
				},ErrorHandler.generate('List entries in directory' + path, callback))
			}
		
			readEntries()
		})
	}
}
