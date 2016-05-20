var webpack = require('webpack');
//var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
var path = require('path');

module.exports = {
    devtool: 'sourcemap',
    entry: [
        './example/example' // Your appʼs entry point
    ],
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'example.js'
    },
    resolve: {
        extensions: ['.js']
    },
    module: {
        loaders: [
            { test: /\.js$/, loader:'babel' }
        ]
    }
    //,plugins: [commonsPlugin,new webpack.HotModuleReplacementPlugin( {hot: true} )]
};