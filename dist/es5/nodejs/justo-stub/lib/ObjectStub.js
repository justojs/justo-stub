"use strict";var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();Object.defineProperty(exports, "__esModule", { value: true });var _PropertyStub = require("./PropertyStub");var _PropertyStub2 = _interopRequireDefault(_PropertyStub);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var 








ObjectStub = function () {





  function ObjectStub(instance) {_classCallCheck(this, ObjectStub);
    Object.defineProperty(this, "instance", { value: instance });
    Object.defineProperty(this, "properties", { value: {} });}_createClass(ObjectStub, [{ key: "respond", value: function respond(














    name) {
      var i, config;for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {args[_key - 1] = arguments[_key];}


      if (args.length === 0) throw new Error("A stub config expected.");else 
      if (args.length == 1) config = args[0];else 
      if (args.length > 1) {;i = args[0];config = args[1];}


      if (/^@/.test(name)) this.respondAttribute(name.substr(1), i, config);else 
      if (/\(\)$/.test(name)) this.respondMethod(name.replace("()", ""), i, config);else 
      throw new Error("Member name must be 'method()' or '@attr'. Received: " + name + ".");} }, { key: "respondAttribute", value: function respondAttribute(










    name, i, config) {var _this = this;
      var prop;


      prop = this.properties[name];

      if (!prop) {
        prop = this.properties[name] = new _PropertyStub2.default();

        Object.defineProperty(this.instance, name, { 
          get: function get() {
            return _this.properties[name].call();}, 

          enumerable: true });}




      prop.respond(i, config);} }, { key: "respondMethod", value: function respondMethod(










    name, i, config) {
      var stub = require("../index");
      var method;


      method = this.instance[name];

      if (!method) {
        Object.defineProperty(this.instance, name, { value: stub(), enumerable: true });
        method = this.instance[name];}



      method.stub.respond(i, config);} }]);return ObjectStub;}();exports.default = ObjectStub;
