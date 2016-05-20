(function(){

var ErrorFactory = new Object();

ErrorFactory.create = function(prefix, cb){
	!prefix && (prefix = 'Error:');
	return function(e){
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
		  };  
		  logger(prefix + ' : ' + msg, 'error');
		  cb(new Error(prefix + ' : ' + msg));
	}
}

function logger(msg, type){
	switch(type){
		case 'info': console.info(msg); break;
		case 'warn': console.warn(msg); break;
		case 'error': console.error(msg); break;
		default: console.log(msg);
	}
}

var dummyFunc = function(){}

var fs = (function(w){

	var FS = null, // h5 file system object
		bytes = 10 * 1024 * 1024,
		initialized = false,
		initializing = false; 

	return {

		isInitialized: function(){
			return initialized;
		},

		init: function(bytes, cb){
			var cb = cb || dummyFunc;
			if(initializing) return;
			initializing = true;
			initialized = false;
			navigator.webkitPersistentStorage.requestQuota(bytes, function(grantBytes){
				(w.requestFileSystem || w.webkitRequestFileSystem)
				(w.PERSISTENT, grantBytes, function(h5fs){
					FS = h5fs;
					initializing = false;
					initialized = true;
					cb(null);
				}, ErrorFactory.create('init file system', cb));

			})
		},

		mkdir: function(path, cb){
			var cb = cb || dummyFunc;
			var folders = path.split('/').filter(function(e){
				return e !== '' && e !== '.';
			})
			var createDir = function(folders, dir) {  

			  var parent = dir || FS.root;

			  // Throw out './' or '/' and move on to prevent something like '/foo/.//bar'.  
			  if (folders[0] == '.' || folders[0] == '') {  
			    folders = folders.slice(1);  
			  }

			  parent.getDirectory(folders[0], {create: true}, function(dirEntry) {  
			    // Recursively add the new subfolder (if we still have another to create).  
			    if (folders.length > 1) {  
			      createDir(folders.slice(1), dirEntry);  
			    } else{
			    	cb(null, dirEntry);
			    }
			  }, ErrorFactory.create('Make dir ' + path, cb));  
			};  

			createDir(folders);	
			
		},

		rmdir: function(path, option, cb){
			var cb = cb || dummyFunc;
			FS.root.getDirectory(path, {}, function(dirEntry){
				if(option.recursive){
					dirEntry.removeRecursively(function(){
						cb(null);
					}, ErrorFactory.create('Remove dir ' + path, cb));
				}else{
					dirEntry.remove(function(){
						cb(null);
					}, ErrorFactory.create('Remove dir ' + path, cb))
				}
			})
		},

		writeFile: function(path, data, cb){
			var cb = cb || dummyFunc;
			FS.root.getFile(path, {create: true}, function(fileEntry){
				fileEntry.createWriter(function(fileWriter){
					var bb = new Blob([data],{type:'text/plain'});
			  		fileWriter.write(bb);

			  		fileWriter.length>data.length && setTimeout(function(){
			  			//Truncate file if current content size less than previous
			  			fileWriter.truncate(data.length);
			  		},10)

			  		cb(null);

				}, ErrorFactory.create('Write to file ' + path, cb))
			}, ErrorFactory.create('Search file ' + path, cb))
		},

		readFile: function(path, cb){
			var cb = cb || dummyFunc;
			FS.root.getFile(path, {create: false}, function(fileEntry){
				fileEntry.file(function(file){
					var fr = new FileReader();  
			       	fr.onloadend = function(e) {  
			         	cb(null, this.result);   
			       	}
			       	fr.readAsText(file);
				}, ErrorFactory.create('Read file ' + path, cb))
			}, ErrorFactory.create('Search file ' + path, cb))
		},

		rmFile: function(path, cb){
			var cb = cb || dummyFunc;
			FS.root.getFile(path, {create: false}, function(fileEntry){
				fileEntry.remove(function() {
			      cb(null);  
			    }, ErrorFactory.create('Remove file ' + path, cb)); 
			}, ErrorFactory.create('Search file ' + path, cb))
		},

		copy: function(src, dest, cb){

		},

		move: function(src, dest, cb){

		},

		watchDir: function(path, cb){

		},

		watchFile: function(path, cb){

		},

		list: function(path, cb){
			var cb = cb || dummyFunc;
			FS.root.getDirectory(path, {}, function(dirEntry){
				var dirReader = dirEntry.createReader();
				var entries = [];
				var readEntries = function(){
					dirReader.readEntries(function(results){
						if(!results.length){
							cb(null, entries);
						}else{
							entries = entries.concat(results);
							readEntries();
						}
					},ErrorFactory.create('List entries in directory' + path, cb))
				}
			
				readEntries();
			})
		}
	}

})(window)


window.fs = fs;

})()

