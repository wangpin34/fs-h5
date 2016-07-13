# fs-h5
 HTML5 file API wrapper as node style file system. 

[![Build Status](https://travis-ci.org/wangpin34/fs-h5.svg)](https://travis-ci.org/wangpin34/fs-h5)
[![Circle CI](https://circleci.com/gh/driftyco/fs-h5.svg?style=svg)](https://circleci.com/gh/driftyco/fs-h5)
[![NPM](https://nodei.co/npm/fs-h5.png?stars&downloads)](https://nodei.co/npm/fs-h5/)

## headers-up
>In April 2014, it was [announced on public-webapps](http://lists.w3.org/Archives/Public/public-webapps/2014AprJun/0010.html) that the Filesystem API spec is not being considered by other browsers. For now, the API is Chrome-specific and it's unlikely to be implemented by other browsers and is no longer being standardized with the W3C.

Actuall it's only supported by Chrome, and also several envs which are using Chrome core like nwjs, cordova etc. It is still useful.

## Install

```javascript
npm install fs-h5 --save
```

## Inspired & Reference

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

* 1.2.1 Update readme

* 1.2.2 Build es5 release
  
  Previously the first step to use fs-h5 is compile it through babel. It is not very friendly because some one doesn't use es2015 currently. So I build a pure es5 code and publish it.

# LICENSE
**MIT**
