import * as fs from 'fs';
import * as path from 'path';
import * as fn from '../delete-after-emit';
import { ProcessOptions, ProcessStats } from '../delete-after-emit.classes';

class TestResults {
    stats: ProcessStats;
    fileExistedEnd: boolean;
    fileExistedStart: boolean;
    constructor(_stats: ProcessStats, _fileExistedEnd: boolean, _fileExistedStart: boolean) {
        this.stats = _stats;
        this.fileExistedEnd = _fileExistedEnd;
        this.fileExistedStart = _fileExistedStart;
    }
    fileDeleted() {
        return this.stats.filesDeleted.length === 1 && !this.fileExistedEnd && this.fileExistedStart;
    }
    fileNotDeleted() {
        return this.stats.filesDeleted.length === 0 && this.fileExistedEnd && this.fileExistedStart;
    }
}

const paths = {
    outputPath: path.resolve(process.cwd(), 'lib/'),
    statFilePath: path.resolve(process.cwd(), 'lib/tests/temp/statfile.json'),
    testFilePath: path.resolve(process.cwd(), 'lib/tests/temp/testfile.js'),
    webpackConfig: path.resolve(process.cwd(), 'lib/tests/webpackTest.config.js'),
    webpackOutput: path.resolve(process.cwd(), 'lib/tests/results/main.js'),
};

const fakeCompilation = {
    compiler: {
        outputPath: paths.outputPath,
    },
};

const defaultOptions: ProcessOptions = {
    doStats: false,
    dryRun: false,
    globs: ['tests/temp/testfile.js'],
    statsPath: 'lib/tests/temp/statfile.json',
    verbose: false,
};

const makeTestFile = (): boolean => {
    if (testFileExits() === false) { // tslint:disable-line
        fs.writeFileSync(paths.testFilePath, JSON.stringify(defaultOptions, undefined, 2), 'utf8');
    }
    return true;
};

const testFileExits = (): boolean => {
    try {
        const stats = fs.statSync(paths.testFilePath);
        return stats !== undefined && stats !== null; // tslint:disable-line
    } catch (err) {
        return false;
    }
};

const statFileExits = (): boolean => {
    try {
        const stats = fs.statSync(paths.statFilePath);
        return stats !== undefined && stats !== null; // tslint:disable-line
    } catch (err) {
        return false;
    }
};

test('webpack file exists and produced output', () => {
    const configStats = fs.statSync(paths.webpackConfig);
    const outputStats = fs.statSync(paths.webpackOutput);
    const configExists = (configStats !== null && configStats !== undefined); // tslint:disable-line
    const outputExists = (outputStats !== null && outputStats !== undefined); // tslint:disable-line
    expect(configExists && outputExists).toBe(true);
});

const runTest = (options: ProcessOptions): TestResults => {
    makeTestFile();
    const fileExistedStart = testFileExits();
    const stats = fn.deleteAfterEmit(fakeCompilation, options);
    // console.log(JSON.stringify(stats, undefined, 2));
    const fileExistedEnd = testFileExits();
    // console.log(`fileExistedStart:${fileExistedStart}, fileExistedEnd:${fileExistedEnd}, stats:${stats}`);
    return new TestResults(stats, fileExistedEnd, fileExistedStart);
};

test('default options, test file deleted', () => {
    const options = defaultOptions;
    expect((runTest(options)).fileDeleted()).toBe(true);
});

test('wildcard glob, test file deleted', () => {
    const options = { ...defaultOptions, ...{ globs: ['tests/temp/test*.*'] } };
    expect((runTest(options)).fileDeleted()).toBe(true);
});

test('bad wildcard glob, test file not deleted', () => {
    const options = { ...defaultOptions, ...{ globs: ['tests/temp/test*.f'] } };
    expect((runTest(options)).fileNotDeleted()).toBe(true);
});

test('dry run, test file not deleted', () => {
    const options = { ...defaultOptions, ...{ dryRun: true } };
    expect((runTest(options)).fileExistedEnd).toBe(true);
});

test('stats file generated', () => {
    const options = { ...defaultOptions, ...{ doStats: true } };
    runTest(options);
    expect(statFileExits()).toBe(true);
});