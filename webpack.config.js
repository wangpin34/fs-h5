var webpack = require('webpack');
//var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
var path = require('path');

module.exports = {
    entry: [
        './example/index' // Your appʼs entry point
    ],
    output: {
        path: path.join(__dirname, 'example'),
        filename: 'index.build.js'
    },
    resolve: {
        extensions: ['.js']
    },
    module: {
        loaders: []
    }
};