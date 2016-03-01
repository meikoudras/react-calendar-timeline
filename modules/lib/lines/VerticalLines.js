'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('../utils.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VerticalLines = function (_Component) {
  _inherits(VerticalLines, _Component);

  function VerticalLines(props) {
    _classCallCheck(this, VerticalLines);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(VerticalLines).call(this, props));
  }

  _createClass(VerticalLines, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return !(nextProps.canvasTimeStart === this.props.canvasTimeStart && nextProps.canvasTimeEnd === this.props.canvasTimeEnd && nextProps.canvasWidth === this.props.canvasWidth && nextProps.lineHeight === this.props.lineHeight && nextProps.lineCount === this.props.lineCount && nextProps.minUnit === this.props.minUnit && nextProps.fixedHeader === this.props.fixedHeader && nextProps.height === this.props.height && nextProps.headerHeight === this.props.headerHeight);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props;
      var canvasTimeStart = _props.canvasTimeStart;
      var canvasTimeEnd = _props.canvasTimeEnd;
      var canvasWidth = _props.canvasWidth;
      var minUnit = _props.minUnit;
      var lineHeight = _props.lineHeight;
      var height = _props.height;
      var headerHeight = _props.headerHeight;

      var ratio = canvasWidth / (canvasTimeEnd - canvasTimeStart);

      var lines = [];

      (0, _utils.iterateTimes)(canvasTimeStart, canvasTimeEnd, minUnit, function (time, nextTime) {
        var left = Math.round((time.valueOf() - canvasTimeStart) * ratio, -2);
        var minUnitValue = time.get(minUnit === 'day' ? 'date' : minUnit);
        var firstOfType = minUnitValue === (minUnit === 'day' ? 1 : 0);
        var lineWidth = firstOfType ? 2 : 1;
        var labelWidth = Math.ceil((nextTime.valueOf() - time.valueOf()) * ratio) - lineWidth;
        var leftPush = _this2.props.fixedHeader === 'fixed' && firstOfType ? -1 : 0;

        var classNames = 'rct-vl' + (firstOfType ? ' rct-vl-first' : '') + (minUnit === 'day' || minUnit === 'hour' || minUnit === 'minute' ? ' rct-day-' + time.day() : '');

        lines.push(_react2.default.createElement('div', { key: 'line-' + time.valueOf(),
          className: classNames,
          style: {
            top: lineHeight * 2 + 'px',
            left: left + leftPush + 'px',
            width: labelWidth + 'px',
            height: height - headerHeight + 'px'
          } }));
      });

      return _react2.default.createElement(
        'div',
        { className: 'rct-vertical-lines' },
        lines
      );
    }
  }]);

  return VerticalLines;
}(_react.Component);

exports.default = VerticalLines;

VerticalLines.propTypes = {
  canvasTimeStart: _react2.default.PropTypes.number.isRequired,
  canvasTimeEnd: _react2.default.PropTypes.number.isRequired,
  canvasWidth: _react2.default.PropTypes.number.isRequired,
  lineHeight: _react2.default.PropTypes.number.isRequired,
  lineCount: _react2.default.PropTypes.number.isRequired,
  minUnit: _react2.default.PropTypes.string.isRequired,
  fixedHeader: _react2.default.PropTypes.string.isRequired
};
VerticalLines.defaultProps = {
  fixedHeader: 'none',
  dayBackground: null
};