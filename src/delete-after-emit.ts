import * as fs from 'fs';
import * as glob from 'glob';
import * as path from 'path';
import { ProcessStats, ProcessOptions } from './delete-after-emit.classes';

export const deleteAfterEmit = (compilation: any, options: ProcessOptions): ProcessStats => {
    const doLog = element => {
        if (options.verbose) {
            console.log(element);
        }
    };
    const outputPath: string = compilation.compiler.outputPath; // tslint:disable-line
    const stats: ProcessStats = {
        bytesDeleted: 0,
        compilerOutputPath: compilation.compiler.outputPath, // tslint:disable-line
        date: new Date(),
        fileCount: 0,
        filesDeleted: [],
        filesFailedToDelete: [],
        globCount: options.globs.length,
        timestamp: new Date().getTime(),
        userOptions: options,
    };

    if (options.globs.length > 0) {
        doLog(`\nwebpack-delete-specific-after-emit`);

        // get files via glob:
        const files: string[] = [];
        for (const globEntry of options.globs) {
            files.push(...glob.sync(globEntry, {
                cwd: outputPath,
            }));
        }
        stats.fileCount = files.length;

        for (const file of files) {
            const filePath = path.join(outputPath, file); // fix thanks to bruce965
            let fileStats: fs.Stats;
            try {
                fileStats = fs.statSync(filePath);
            } catch (errFSStat) {
                stats.filesFailedToDelete.push(filePath);
                doLog(' Failed to remove\t' + filePath);
                continue;
            }

            // delete the file:
            if (!options.dryRun) {
                fs.unlinkSync(filePath);
            }

            stats.filesDeleted.push({
                filePath,
                fileStats,
            });
            stats.bytesDeleted += fileStats.size;

            doLog(' Removed\t' + filePath);
        }
        doLog(`Deleted ${stats.filesDeleted.length.toLocaleString() + (stats.filesDeleted.length < 2 ? ' file' : ' files')}`);
    }

    if (options.doStats) {
        fs.writeFileSync(`${process.cwd()}/${options.statsPath}`, JSON.stringify(stats, undefined, 2));
    }

    return stats;
};