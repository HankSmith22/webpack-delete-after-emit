'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _fs = require('fs');

var fs = _interopRequireWildcard(_fs);

var _path = require('path');

var path = _interopRequireWildcard(_path);

var _deleteAfterEmit = require('../delete-after-emit');

var fn = _interopRequireWildcard(_deleteAfterEmit);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TestResults = function () {
    function TestResults(_stats, _fileExistedEnd, _fileExistedStart) {
        (0, _classCallCheck3.default)(this, TestResults);

        this.stats = _stats;
        this.fileExistedEnd = _fileExistedEnd;
        this.fileExistedStart = _fileExistedStart;
    }

    (0, _createClass3.default)(TestResults, [{
        key: 'fileDeleted',
        value: function fileDeleted() {
            return this.stats.filesDeleted.length === 1 && !this.fileExistedEnd && this.fileExistedStart;
        }
    }, {
        key: 'fileNotDeleted',
        value: function fileNotDeleted() {
            return this.stats.filesDeleted.length === 0 && this.fileExistedEnd && this.fileExistedStart;
        }
    }]);
    return TestResults;
}();

var paths = {
    outputPath: path.resolve(process.cwd(), 'lib/'),
    statFilePath: path.resolve(process.cwd(), 'lib/tests/temp/statfile.json'),
    testFilePath: path.resolve(process.cwd(), 'lib/tests/temp/testfile.js'),
    webpackConfig: path.resolve(process.cwd(), 'lib/tests/webpackTest.config.js'),
    webpackOutput: path.resolve(process.cwd(), 'lib/tests/results/main.js')
};
var fakeCompilation = {
    compiler: {
        outputPath: paths.outputPath
    }
};
var defaultOptions = {
    doStats: false,
    dryRun: false,
    globs: ['tests/temp/testfile.js'],
    statsPath: 'lib/tests/temp/statfile.json',
    verbose: false
};
var makeTestFile = function makeTestFile() {
    if (testFileExits() === false) {
        fs.writeFileSync(paths.testFilePath, (0, _stringify2.default)(defaultOptions, undefined, 2), 'utf8');
    }
    return true;
};
var testFileExits = function testFileExits() {
    try {
        var stats = fs.statSync(paths.testFilePath);
        return stats !== undefined && stats !== null; // tslint:disable-line
    } catch (err) {
        return false;
    }
};
var statFileExits = function statFileExits() {
    try {
        var stats = fs.statSync(paths.statFilePath);
        return stats !== undefined && stats !== null; // tslint:disable-line
    } catch (err) {
        return false;
    }
};
test('webpack file exists and produced output', function () {
    var configStats = fs.statSync(paths.webpackConfig);
    var outputStats = fs.statSync(paths.webpackOutput);
    var configExists = configStats !== null && configStats !== undefined; // tslint:disable-line
    var outputExists = outputStats !== null && outputStats !== undefined; // tslint:disable-line
    expect(configExists && outputExists).toBe(true);
});
var runTest = function runTest(options) {
    makeTestFile();
    var fileExistedStart = testFileExits();
    var stats = fn.deleteAfterEmit(fakeCompilation, options);
    // console.log(JSON.stringify(stats, undefined, 2));
    var fileExistedEnd = testFileExits();
    // console.log(`fileExistedStart:${fileExistedStart}, fileExistedEnd:${fileExistedEnd}, stats:${stats}`);
    return new TestResults(stats, fileExistedEnd, fileExistedStart);
};
test('default options, test file deleted', function () {
    var options = defaultOptions;
    expect(runTest(options).fileDeleted()).toBe(true);
});
test('wildcard glob, test file deleted', function () {
    var options = (0, _assign2.default)({}, defaultOptions, { globs: ['tests/temp/test*.*'] });
    expect(runTest(options).fileDeleted()).toBe(true);
});
test('bad wildcard glob, test file not deleted', function () {
    var options = (0, _assign2.default)({}, defaultOptions, { globs: ['tests/temp/test*.f'] });
    expect(runTest(options).fileNotDeleted()).toBe(true);
});
test('dry run, test file not deleted', function () {
    var options = (0, _assign2.default)({}, defaultOptions, { dryRun: true });
    expect(runTest(options).fileExistedEnd).toBe(true);
});
test('stats file generated', function () {
    var options = (0, _assign2.default)({}, defaultOptions, { doStats: true });
    runTest(options);
    expect(statFileExits()).toBe(true);
});
//# sourceMappingURL=delete-after-emit.test.js.map