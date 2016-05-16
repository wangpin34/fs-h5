# fs-h5
Decorate future HTML5 file api to node style file system api. 

[![NPM](https://nodei.co/npm/fs-h5.png?stars&downloads)](https://nodei.co/npm/fs-h5/)

## headers-up
>In April 2014, it was [announced on public-webapps](http://lists.w3.org/Archives/Public/public-webapps/2014AprJun/0010.html) that the Filesystem API spec is not being considered by other browsers. For now, the API is Chrome-specific and it's unlikely to be implemented by other browsers and is no longer being standardized with the W3C.

Actuall it's only supported by Chrome, and also several envs which are using Chrome core like nwjs, cordova etc. It is still useful.


## Install

* Via npm

  ```javascript
  npm install fs-h5 --save
  ```

*  Download standalone

	1. For develop
	2. For production,compressed code

## Usage

## API

* fs.requestQuoto(bytes, callback)
	
    Request specified spaces file sandbox. This function should be called before all fs api perform.

* fs.mkdir(path, callback)
	
    Create directory. If parent dir non-exists, it will try to create parent dir firstly if property create in option is true.
    
* fs.writeFile(path, data, callback)

	Write content to file

* fs.readFile(path, callback)
	
	Read file content

* fs.rmdir(path, option, callback)

	Remove dir

	If given path has sub-dir or files, option recursive should be true. Or it will throw error.

* fs.rmFile(path, callback)

	Remove file

* fs.list(path, callback)
	
	List all dirs and files in the path
    

## Example

It is localated in example folder. Please following its guide to deploy it in you local machine.

[Online Example](https://rawgit.com/wangpin34/fs-h5/master/example/index.html)

## References
* [HTML5 filesytem](http://www.html5rocks.com/en/tutorials/file/filesystem/)



# LICENSE
**MIT**