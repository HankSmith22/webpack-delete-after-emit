/* tslint:disable */
const path = require('path');
const webpack = require('webpack');
const WebpackDeleteAfterEmit = require('../../index.js');

module.exports = {
    entry: path.resolve(process.cwd(), 'lib/index.js'),
    output: {
        path: path.resolve(process.cwd(), 'lib/tests/results'),
        filename: '[name].js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
        }],
    },
    plugins: [
        new WebpackDeleteAfterEmit(),
    ],
    target: 'node',
};
/* tslint:enable */

// todo add babel process after tsc

// typescript def