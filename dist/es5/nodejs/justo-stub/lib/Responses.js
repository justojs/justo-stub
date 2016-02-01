"use strict";var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();Object.defineProperty(exports, "__esModule", { value: true });var _IndexedResponses = require("./IndexedResponses");var _IndexedResponses2 = _interopRequireDefault(_IndexedResponses);var _ArguedResponses = require("./ArguedResponses");var _ArguedResponses2 = _interopRequireDefault(_ArguedResponses);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var 










Responses = function () {



  function Responses() {_classCallCheck(this, Responses);
    Object.defineProperty(this, "default", { value: undefined, writable: true });
    Object.defineProperty(this, "indexed", { value: new _IndexedResponses2.default() });
    Object.defineProperty(this, "argued", { value: new _ArguedResponses2.default() });}_createClass(Responses, [{ key: "find", value: function find(









    callCount, args) {
      var res;


      res = this.indexed.find(callCount);
      if (!res) res = this.argued.find(args);
      if (!res) res = this.default;


      return res;} }, { key: "add", value: function add() 












    {
      var i, res;for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {args[_key] = arguments[_key];}


      if (args.length == 1) res = args[0];else {
        ;i = args[0];res = args[1];}


      if (i !== undefined && i !== null) {
        this.indexed.add(i, res);} else 
      {
        if (!res.arguments) this.default = res;else 
        this.argued.add(res);}} }]);return Responses;}();exports.default = Responses;
