# webpack-delete-after-emit

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/gsdnano/webpack-delete-after-emit/master/LICENSE)
[![Github All Releases](https://img.shields.io/github/downloads/gsdnano/webpack-delete-after-emit/total.svg)](https://github.com/gsdnano/webpack-delete-after-emit)
[![npm](https://img.shields.io/npm/v/webpack-delete-after-emit.svg)](https://www.npmjs.com/package/webpack-delete-after-emit)

Deletes globs after webpack is done emitting files. Used for cleaning up post-webpack for deployments.

# Installation

Install via NPM.

    npm i -D webpack-delete-after-emit

# Usage
Require and add to plugins section of webpack.

    const WebpackDeleteAfterEmit = require('webpack-delete-after-emit');
    
    new WebpackDeleteAfterEmit({
        globs:['*.debug.js']
    })
    
With some  options

    new WebpackDeleteAfterEmit({
        globs:['*.debug.js'],
        verbose: true,
        doStats: true,
        dryRun: false
    })

# Options

* `globs` Array of file globs ( https://github.com/isaacs/node-glob ). Array default is `[]`
* `Verbose` Verbose output. Boolean default is `false`
* `doStats` Outputs a stats file. Boolean default is `false`
* `statsPath` Relative to the webpack output folder, the stats file path. Only used if doStats is set to true. String default is `./dist/stats-webpack-delete-after-emit.json`
* `dryRun` If true will not delete files. Boolean default is `false`

# Misc

Common usage is post webpack cleansing for automatic one-command build & deployment for static websites hosted on S3.
