"use strict";var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();Object.defineProperty(exports, "__esModule", { value: true });var _Response = require("./Response");var _Response2 = _interopRequireDefault(_Response);var _Responses = require("./Responses");var _Responses2 = _interopRequireDefault(_Responses);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var 









CallableStub = function () {



  function CallableStub() {_classCallCheck(this, CallableStub);
    Object.defineProperty(this, "responses", { value: new _Responses2.default() });
    Object.defineProperty(this, "callCount", { value: 0, writable: true });}_createClass(CallableStub, [{ key: "respond", value: function respond() 












    {
      var i, call, res;for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {args[_key] = arguments[_key];}


      if (args.length == 1) {
        call = args[0];} else 
      {
        i = args[0];call = args[1];}



      res = new _Response2.default(call);

      if (typeof i == "number") this.responses.add(i, res);else 
      this.responses.add(res);} }, { key: "call", value: function call(








    args) {
      var res;


      res = this.responses.find(this.callCount, args);
      this.callCount += 1;


      if (res) {
        if (res.action == "throw") throw res.error;else 
        return res.value;} else 
      {
        return undefined;}} }]);return CallableStub;}();exports.default = CallableStub;
