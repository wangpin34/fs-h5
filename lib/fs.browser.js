(function(){

var ErrorFactory = new Object();

ErrorFactory.create = function(prefix){
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

var fs = (function(w){

	var FS = null, // h5 file system object
		bytes = 10 * 1024 * 1024; 

	return {

		requestQuoto: function(bytes, callback){
			navigator.webkitPersistentStorage.requestQuota(bytes, function(grantBytes){

				(w.requestFileSystem || w.webkitRequestFileSystem)
				(w.PERSISTENT, grantBytes, function(h5fs){
					FS = h5fs;
					callback(h5fs)
				}, ErrorFactory.create('init file system'));

			})
		},

		mkdir: function(path, callback){
			
			//FS.root.getDirectory(path, {create: true}, callback, ErrorFactory.create('Create dir' + path));
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
			    	callback(dirEntry);
			    }
			  }, ErrorFactory.create('Make dir ' + path));  
			};  

			createDir(folders);	
			
		},

		rmdir: function(path, option, callback){
			FS.root.getDirectory(path, {}, function(dirEntry){
				if(option.recursive){
					dirEntry.removeRecursively(function(){
						callback()
					}, ErrorFactory.create('Remove dir ' + path));
				}else{
					dirEntry.remove(function(){
						callback()
					}, ErrorFactory.create('Remove dir ' + path))
				}
			})
		},

		writeFile: function(path, data, callback){
			FS.root.getFile(path, {create: true}, function(fileEntry){
				fileEntry.createWriter(function(fileWriter){
					var bb = new Blob([data],{type:'text/plain'});
			  		fileWriter.write(bb);

			  		fileWriter.length>data.length && setTimeout(function(){
			  			//Truncate file if current content size less than previous
			  			fileWriter.truncate(data.length);
			  		},10)

			  		callback();

				}, ErrorFactory.create('Write to file ' + path))
			}, ErrorFactory.create('Search file ' + path))
		},

		readFile: function(path, callback){
			FS.root.getFile(path, {create: false}, function(fileEntry){
				fileEntry.file(function(file){
					var fr = new FileReader();  
			       	fr.onloadend = function(e) {  
			         	callback(this.result);   
			       	}
			       	fr.readAsText(file);
				}, ErrorFactory.create('Read file ' + path))
			}, ErrorFactory.create('Search file ' + path))
		},

		rmFile: function(path, callback){
			FS.root.getFile(path, {create: false}, function(fileEntry){
				fileEntry.remove(function() {  
			      console.log('File removed.');  
			    }, ErrorFactory.create('Remove file ' + path)); 
			}, ErrorFactory.create('Search file ' + path))
		},

		copy: function(src, dest){

		},

		move: function(src, dest){

		},

		watchDir: function(path, callback){

		},

		watchFile: function(path, callback){

		},

		list: function(path, callback){
			FS.root.getDirectory(path, {}, function(dirEntry){
				var dirReader = dirEntry.createReader();
				var entries = [];
				var readEntries = function(){
					dirReader.readEntries(function(results){
						if(!results.length){
							callback(entries);
						}else{
							entries = entries.concat(results);
							readEntries();
						}
					},ErrorFactory.create('List entries in directory' + path))
				}
			
				readEntries();
			})
		}
	}

})(window)


window.fs = fs;

})()

