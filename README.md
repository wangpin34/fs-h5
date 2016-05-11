# fs-html5
Decorate html5 file api to node style file system api. 

Still in progress.

## Install

* Via npm

  ```javascript
  npm install fs-html5 --save
  ```

*  Download standalone

	1. For develop
	2. For production,compressed code

## Usage



## API

* fs.requestQuoto(bytes, callback)
	
    Request specified spaces file sandbox.

* fs.mkdir(path, callback)
	
    Create directory. If parent dir non-exists, it will try to create parent dir firstly if property create in option is true.
    
* fs.writeFile(path, data, callback)

	Write content to file

* fs.readFile(path, callback)
	
	Read file content

* fs.rmdir(path, option, callback)

	Remove dir
    
* fs.watchDir(path, callback)
	
	Watch dir changes(add,remove,rename file)

* fs.watchFile(path, callback)
	Watch file content change, if file has been removed.

# LICENSE
**MIT**