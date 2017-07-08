'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ProcessStats = exports.ProcessOptions = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProcessOptions = exports.ProcessOptions = function ProcessOptions() {
    (0, _classCallCheck3.default)(this, ProcessOptions);

    this.globs = [];
    this.verbose = false;
    this.doStats = false;
    this.dryRun = false;
    this.statsPath = './dist/stats-webpack-delete-after-emit.json';
};

var ProcessStats = exports.ProcessStats = function ProcessStats() {
    (0, _classCallCheck3.default)(this, ProcessStats);

    this.bytesDeleted = 0;
    this.fileCount = 0;
};
//# sourceMappingURL=delete-after-emit.classes.js.map