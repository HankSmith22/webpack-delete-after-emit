'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _deleteAfterEmit = require('./delete-after-emit');

var fn = _interopRequireWildcard(_deleteAfterEmit);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WebpackDeleteAfterEmit = function () {
    function WebpackDeleteAfterEmit() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        (0, _classCallCheck3.default)(this, WebpackDeleteAfterEmit);

        var defaultOptions = {
            doStats: false,
            dryRun: false,
            globs: [],
            statsPath: './dist/stats-webpack-delete-after-emit.json',
            verbose: false
        };
        this.options = (0, _assign2.default)({}, defaultOptions, options);
    }

    (0, _createClass3.default)(WebpackDeleteAfterEmit, [{
        key: 'apply',
        value: function apply(compiler) {
            var _this = this;

            compiler.plugin('after-emit', function (compilation, callback) {
                fn.deleteAfterEmit(compilation, _this.options);
                callback();
            });
        }
    }]);
    return WebpackDeleteAfterEmit;
}();

module.exports = WebpackDeleteAfterEmit;
//# sourceMappingURL=index.js.map