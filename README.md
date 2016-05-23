# fs-h5
Decorate future HTML5 file api to node style file system api. 

[![NPM](https://nodei.co/npm/fs-h5.png?stars&downloads)](https://nodei.co/npm/fs-h5/)

## headers-up
>In April 2014, it was [announced on public-webapps](http://lists.w3.org/Archives/Public/public-webapps/2014AprJun/0010.html) that the Filesystem API spec is not being considered by other browsers. For now, the API is Chrome-specific and it's unlikely to be implemented by other browsers and is no longer being standardized with the W3C.

Actuall it's only supported by Chrome, and also several envs which are using Chrome core like nwjs, cordova etc. It is still useful.

It's created by es6, so you need to convert it by babel with specify preset.

For simple usage, please download standalone release.

## Install

* Via npm

  ```javascript
  npm install fs-h5 --save
  ```

*  Download standalone

	1. For develop
	```
		<script type="text/javascript" src="http://rawgit.com/wangpin34/fs-h5/master/lib/fs.js"></script>
	```

	2. For production,compressed code
	```
		<script type="text/javascript" src="http://rawgit.com/wangpin34/fs-h5/master/build/fs.js"></script>
	```

## Usage

## API

* fs.init(bytes, callback)
	
    Initialize specified spaces file sandbox. This function should be called before all fs api perform.

    **Note**：the first argument of callback always been error object or null. 

* fs.isInitialized()
	
	Return the state that indicates whether file system is initialized succssfully.

* fs.existsDir(path, callback)

  Test whether or not the given directory exists by checking with the file system. Then call the callback argument with either true or false. Example:

 	```
 	fs.exists(path, (err, exists) => {
	  console.log(exists ? 'it\'s there' : 'non-exist!');
	});

 	```

* fs.existsFile(path, callback)

  Test whether or not the given file exists by checking with the file system. Then call the callback argument with either true or false. Example:

 	```
 	fs.exists(path, (err, exists) => {
	  console.log(exists ? 'it\'s there' : 'non-exist!');
	});

 	```

* fs.mkdir(path, callback)
	
    Create directory. If parent dir non-exists, it will try to create parent dir firstly.
    
* fs.writeFile(path, data, callback)

	Write content to file

* fs.readFile(path, callback)
	
	Read file content. Second argument of callback should be file content.

* fs.rmdir(path, option, callback)

	Remove dir

	If given path has sub-dir or files, option recursive should be true. Or it  throws error.

* fs.rmFile(path, callback)

	Remove file

* fs.list(path, callback)
	
	List all dirs and files in the path. Second argument of callback should be HTML5 files or directory entries. You can check availabe properties by dev tools of browser.
	
	In the future they shall be wrapped as objects with clear interfaces.
    

## Example

It is localated in example folder. Please following readme in that folder to deploy it in you local pc.

[Online Example](https://rawgit.com/wangpin34/fs-h5/master/example/index.html)

## References
* [HTML5 filesytem](http://www.html5rocks.com/en/tutorials/file/filesystem/)

## Compile standalone fs
Currently standalone is writed by pure es5 with most same logic with es6 codes in src. And compile prececss depends on gulp.

```
npm run compile
```

# LICENSE
**MIT**