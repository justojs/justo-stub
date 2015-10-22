//imports
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

var _PropertyStub = require("./PropertyStub");

var _PropertyStub2 = _interopRequireDefault(_PropertyStub);

/**
 * A stub for an instance object.
 *
 * @readonly(protected) instance:object   The instance object to double.
 * @readonly(protected) properties:object The doubled properties.
 */

var ObjectStub = (function () {
  /**
   * Constructor.
   *
   * @param(attr) instance
   */

  function ObjectStub(instance) {
    _classCallCheck(this, ObjectStub);

    Object.defineProperty(this, "instance", { value: instance });
    Object.defineProperty(this, "properties", { value: {} });
  }

  /**
   * Defines a response.
   *
   * @overload
   * @param name:string   The member name: method() or @attr.
   * @param config:object The configuration object: args, value and error.
   *
   * @overload Indexed response
   * @param name:string   The member name to double: method() or @attr.
   * @param i:number      The index.
   * @param config:object The configuration object: args, value and error.
   */

  _createClass(ObjectStub, [{
    key: "respond",
    value: function respond(name) {
      var i, config;

      //(1) arguments

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      if (args.length === 0) throw new Error("A stub config expected.");else if (args.length == 1) config = args[0];else if (args.length > 1) {
        ;

        i = args[0];
        config = args[1];
      } //(2) add response
      if (/^@/.test(name)) this.respondAttribute(name.substr(1), i, config);else if (/\(\)$/.test(name)) this.respondMethod(name.replace("()", ""), i, config);else throw new Error("Member name must be 'method()' or '@attr'. Received: " + name + ".");
    }

    /**
     * Defines an attribute response.
     *
     * @protected
     * @param name:string   The attribute name.
     * @param i:number      The index. If null, default response.
     * @param config:object The attribute configureation: error (object) or value (object).
     */
  }, {
    key: "respondAttribute",
    value: function respondAttribute(name, i, config) {
      var _this = this;

      var prop;

      //(1) get property stub
      prop = this.properties[name];

      if (!prop) {
        prop = this.properties[name] = new _PropertyStub2["default"]();

        Object.defineProperty(this.instance, name, {
          get: function get() {
            return _this.properties[name].call();
          },
          enumerable: true
        });
      }

      //(2) add response
      prop.respond(i, config);
    }

    /**
     * Defines a method response.
     *
     * @protected
     * @param name:string   The method name.
     * @param i:number      The index. If null, default or argued response.
     * @param config:object The configuration: args, error and value.
     */
  }, {
    key: "respondMethod",
    value: function respondMethod(name, i, config) {
      var method;

      //(1) create stub
      method = this.instance[name];

      if (!method) {
        Object.defineProperty(this.instance, name, { value: (0, _index2["default"])(), enumerable: true });
        method = this.instance[name];
      }

      //(2) add response
      method.stub.respond(i, config);
    }
  }]);

  return ObjectStub;
})();

exports["default"] = ObjectStub;
module.exports = exports["default"];
