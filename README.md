# fs-h5
Decorate HTML5 file API to node style file system. 

[![Build Status](https://travis-ci.org/wangpin34/fs-h5.svg)](https://travis-ci.org/wangpin34/fs-h5)
[![Circle CI](https://circleci.com/gh/driftyco/fs-h5.svg?style=svg)](https://circleci.com/gh/driftyco/fs-h5)
[![NPM](https://nodei.co/npm/fs-h5.png?stars&downloads)](https://nodei.co/npm/fs-h5/)

## headers-up
>In April 2014, it was [announced on public-webapps](http://lists.w3.org/Archives/Public/public-webapps/2014AprJun/0010.html) that the Filesystem API spec is not being considered by other browsers. For now, the API is Chrome-specific and it's unlikely to be implemented by other browsers and is no longer being standardized with the W3C.

Actuall it's only supported by Chrome, and also several envs which are using Chrome core like nwjs, cordova etc. It is still useful.

It's created by es6, so you need to convert it by babel with specify preset.

## Install

```javascript
npm install fs-h5 --save
```

## Links

* [Documents](https://github.com/wangpin34/fs-h5/wiki)
* [HTML5 filesytem](http://www.html5rocks.com/en/tutorials/file/filesystem/)

## Release log
* 1.1.4 beta release
* 1.2.0 promisify and rename several methods
  ```
   isInitialized ->  isReady
   existsDir + existsFile -> existsPath
  ```
  Add a new method **requestQuota** for applying persistent storage.

# LICENSE
**MIT**
