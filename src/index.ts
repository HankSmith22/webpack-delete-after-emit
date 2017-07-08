import * as webpack from 'webpack';
import * as fn from './delete-after-emit';
import { ProcessOptions } from './delete-after-emit.classes';

class WebpackDeleteAfterEmit {
    options: ProcessOptions;

    constructor(options = {}) {
        const defaultOptions:ProcessOptions = {
            doStats: false,
            dryRun: false,
            globs: [],
            statsPath: './dist/stats-webpack-delete-after-emit.json',
            verbose: false,
        };
        this.options = { ...defaultOptions, ...options };
    }

    apply(compiler:webpack.Compiler) {
        compiler.plugin('after-emit', (compilation:any, callback:() => void) => { //tslint:disable-line
            fn.deleteAfterEmit(compilation, this.options);
            callback();
        });
    }
}

module.exports = WebpackDeleteAfterEmit;