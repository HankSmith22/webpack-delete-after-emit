import * as fs from 'fs';

interface IFilesDeleted {
    filePath: string;
    fileStats: fs.Stats;
}

export class ProcessOptions {
    globs: string[] = [];
    verbose = false;
    doStats = false;
    dryRun = false;
    statsPath = './dist/stats-webpack-delete-after-emit.json';
}

export class ProcessStats {
    bytesDeleted = 0;
    compilerOutputPath: string;
    date: Date;
    fileCount = 0;
    filesDeleted: IFilesDeleted[];
    filesFailedToDelete: string[];
    globCount: number;
    timestamp: number;
    userOptions: ProcessOptions;
}