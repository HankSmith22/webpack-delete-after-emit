'use strict';
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const glob = require('glob');

function WebpackDeleteAfterEmit(options) {
    this.options = Object.assign({}, {
        globs: [],
        verbose: false,
        doStats: false,
        dryRun: false,
        statsPath: './dist/stats-webpack-delete-after-emit.json'
    }, options);
}

WebpackDeleteAfterEmit.prototype.apply = function (compiler) {
    var self = this;

    compiler.plugin('after-emit', function (compilation, callback) {
        var outputPath = compilation.compiler.outputPath;
        var stats = {
            date: new Date(),
            timestamp: new Date().getTime(),
            globCount: self.options.globs.length,
            fileCount: 0,
            filesDeleted: [],
            filesFailedToDelete: [],
            userOptions: Object.assign({}, self.options),
            bytesDeleted: 0,
            compilerOutputPath: compilation.compiler.outputPath
        }
        if (self.options.globs.length > 0) {
            doLog(chalk.bold.green("\nwebpack-delete-specific-after-emit"));

            //Get files via glob:
            var files = [];
            for (var i = 0; i < self.options.globs.length; i++) {
                files.push(...glob.sync(self.options.globs[i], {
                    cwd: outputPath
                }));
            }
            stats.fileCount = files.length;

            for (var i = 0; i < files.length; i++) {
                var filePath = outputPath + "\\" + files[i];
                var fileStats = fs.statSync(filePath);
                if (fileStats) {
                    //Delete the file:
                    if (!self.options.dryRun) {
                        fs.unlinkSync(filePath);
                    }

                    stats.filesDeleted.push({
                        filePath: filePath,
                        fileStats: Object.assign({}, fileStats)
                    });
                    stats.bytesDeleted += fileStats.size;

                    doLog(chalk.bold.yellow(" Removed\t" + filePath));
                } else {
                    filesFailedToDelete.push(filePath);
                    doLog(chalk.bold.red(" Failed to remove\t" + filePath));
                }
            }
            doLog(chalk.bold.green("Deleted " + stats.filesDeleted.length.toLocaleString() + (stats.filesDeleted.length < 2 ? " file" : " files")));
        }

        if (self.options.doStats) {
            fs.writeFileSync(process.cwd() + "/" + self.options.statsPath, JSON.stringify(stats, null, 2));
        }

        callback();
    });

    function doLog(element) {
        if (self.options.verbose === true) {
            console.log(element);
        }
    }
};

module.exports = WebpackDeleteAfterEmit;