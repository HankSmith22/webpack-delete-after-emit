'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.deleteAfterEmit = undefined;

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _fs = require('fs');

var fs = _interopRequireWildcard(_fs);

var _glob = require('glob');

var glob = _interopRequireWildcard(_glob);

var _path = require('path');

var path = _interopRequireWildcard(_path);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var deleteAfterEmit = exports.deleteAfterEmit = function deleteAfterEmit(compilation, options) {
    var doLog = function doLog(element) {
        if (options.verbose) {
            console.log(element);
        }
    };
    var outputPath = compilation.compiler.outputPath; // tslint:disable-line
    var stats = {
        bytesDeleted: 0,
        compilerOutputPath: compilation.compiler.outputPath,
        date: new Date(),
        fileCount: 0,
        filesDeleted: [],
        filesFailedToDelete: [],
        globCount: options.globs.length,
        timestamp: new Date().getTime(),
        userOptions: options
    };
    if (options.globs.length > 0) {
        doLog('\nwebpack-delete-specific-after-emit');
        // get files via glob:
        var files = [];
        for (var _iterator = options.globs, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
            var _ref;

            if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
            } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref = _i.value;
            }

            var globEntry = _ref;

            files.push.apply(files, (0, _toConsumableArray3.default)(glob.sync(globEntry, {
                cwd: outputPath
            })));
        }
        stats.fileCount = files.length;
        for (var _iterator2 = files, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator3.default)(_iterator2);;) {
            var _ref2;

            if (_isArray2) {
                if (_i2 >= _iterator2.length) break;
                _ref2 = _iterator2[_i2++];
            } else {
                _i2 = _iterator2.next();
                if (_i2.done) break;
                _ref2 = _i2.value;
            }

            var file = _ref2;

            var filePath = path.join(outputPath, file); // fix thanks to bruce965
            var fileStats = void 0;
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
                filePath: filePath,
                fileStats: fileStats
            });
            stats.bytesDeleted += fileStats.size;
            doLog(' Removed\t' + filePath);
        }
        doLog('Deleted ' + (stats.filesDeleted.length.toLocaleString() + (stats.filesDeleted.length < 2 ? ' file' : ' files')));
    }
    if (options.doStats) {
        fs.writeFileSync(process.cwd() + '/' + options.statsPath, (0, _stringify2.default)(stats, undefined, 2));
    }
    return stats;
};
//# sourceMappingURL=delete-after-emit.js.map