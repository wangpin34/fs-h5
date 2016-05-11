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
		  
		  return prefix + ' : ' + msg;
	}
}

var fs = (function(w){

	var FS = null; // h5 file system object

	var checkFS = function(){
		if(!FS) throw new Error('File system is not ready');
	}

	return {

		requestQuoto: function(bytes, callback){
			navigator.webkitPersistentStorage.requestQuota(requestedBytes, function(grantBytes){

				(w.requestFileSystem || w.webkitRequestFileSystem)
				(w.PERSISTENT, grantBytes, function(h5fs){
					FS = h5fs;
					callback(h5fs)
				}, ErrorFactory.create('init file system'));

			})
		},

		mkdir: function(path, callback){
			
			//FS.root.getDirectory(path, {create: true}, callback, ErrorFactory.create('Create dir' + path));
			
			var createDir = function(folders) {  
			  // Throw out './' or '/' and move on to prevent something like '/foo/.//bar'.  
			  if (folders[0] == '.' || folders[0] == '') {  
			    folders = folders.slice(1);  
			  }  
			  FS.root.getDirectory(folders[0], {create: true}, function(dirEntry) {  
			    // Recursively add the new subfolder (if we still have another to create).  
			    if (folders.length) {  
			      createDir(dirEntry, folders.slice(1));  
			    } else{
			    	callback();
			    }
			  }, errorHandler);  
			};  
			  
			createDir(fs.root, path.split('/'));
		},

		rmdir: function(path, option, callback){
			if(option.recursive){
				FS.root.removeRecursively(callback, ErrorFactory.create('Remove dir' + path));
			}else{
				FS.root.getDirectory(path, {}, function(dirEntry){
					dirEntry.remove(function(){
						console.log('Dir ' + path + ' has been removed')
					}, ErrorFactory.create('Remove dir' + path))
				})
			}
			
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

		listEntries: function(path, callback){
			FS.root.getDirectory(path, {}, function(dirEntry){
				var dirReader = dirEntry.createReader();
				var entries = [];
				let readEntries = function(){
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

}(window)


if(exports){
	module.exports = fs;
}else{
	window['fs'] = fs;
}