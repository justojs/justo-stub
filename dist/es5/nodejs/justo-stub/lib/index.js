/**
 * Creates a test stub.
 *
 * @overload Function stub.
 * @noparam
 * @return function
 *
 * @overload Object stub.
 * @param obj:object        The object to double.
 * @param [members]:object  The members to double.
 * @return ObjectStub
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

exports.stub = stub;

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function stub() {
  var double;

  //(1) create dummy

  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  if (args.length === 0) double = createFunctionStub();else double = createObjectStub.apply(undefined, args);

  //(2) return dummy
  return double;
}

/**
 * Creates a function stub.
 */
function createFunctionStub() {
  var res;

  //(1) create stub
  res = function () {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return res.stub.call(args);
  };

  Object.defineProperty(res, "stub", { value: new FunctionStub() });

  //(2) return
  return res;
}

/**
 * Creates an object dummy.
 *
 * @param obj:object        The object to double.
 * @param [members]:object  The members to double.
 */
function createObjectStub(obj) {
  var members = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  //(1) double
  Object.defineProperty(obj, "stub", { value: new ObjectStub(obj) });

  for (var i = 0, names = Object.keys(members); i < names.length; ++i) {
    var _name = names[i];
    var value = members[_name];

    if (value.constructor.name != "Object") value = { value: value };

    obj.stub.respond(_name, value);
  }

  //(2) return
  return obj;
}

/**
 * Base for the callable objects.
 *
 * @abstract
 * @attr(protected) callCount:number  The current number of calls.
 */

var CallableStub = (function () {
  /**
   * Constructor.
   */

  function CallableStub() {
    _classCallCheck(this, CallableStub);

    Object.defineProperty(this, "responses", { value: new Responses() });
    Object.defineProperty(this, "callCount", { value: 0, writable: true });
  }

  /**
   * A stub for a function.
   */

  /**
   * Defines a response.
   *
   * @overload
   * @param call:object	The call info: args and error or value.
   *
   * @overload
   * @param i:number		The number of call.
   * @param call:object	The call info: args and error or value.
   */

  _createClass(CallableStub, [{
    key: "respond",
    value: function respond() {
      var i, call, res;

      //(1) arguments

      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      if (args.length == 1) {
        call = args[0];
      } else {
        i = args[0];
        call = args[1];
      }

      //(2) add response
      res = new Response(call);

      if (typeof i == "number") this.responses.add(i, res);else this.responses.add(res);
    }

    /**
     * Calls the stub.
     *
     * @protected
     * @param args:object[]	The arguments passed to the call.
     */
  }, {
    key: "call",
    value: function call(args) {
      var res;

      //(1) get response
      res = this.responses.find(this.callCount, args);
      this.callCount += 1;

      //(2) respond
      if (res) {
        if (res.action == "throw") throw res.error;else return res.value;
      } else {
        return undefined;
      }
    }
  }]);

  return CallableStub;
})();

var FunctionStub = (function (_CallableStub) {
  _inherits(FunctionStub, _CallableStub);

  function FunctionStub() {
    _classCallCheck(this, FunctionStub);

    _get(Object.getPrototypeOf(FunctionStub.prototype), "constructor", this).apply(this, arguments);
  }

  /**
   * A stub for a property or attribute.
   */
  return FunctionStub;
})(CallableStub);

exports.FunctionStub = FunctionStub;

var PropertyStub = (function (_CallableStub2) {
  _inherits(PropertyStub, _CallableStub2);

  function PropertyStub() {
    _classCallCheck(this, PropertyStub);

    _get(Object.getPrototypeOf(PropertyStub.prototype), "constructor", this).apply(this, arguments);
  }

  /**
   * A stub for an instance object.
   *
   * @readonly(protected) instance:object   The instance object to double.
   * @readonly(protected) properties:object The doubled properties.
   */
  return PropertyStub;
})(CallableStub);

exports.PropertyStub = PropertyStub;

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

  //imports

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

      for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        args[_key4 - 1] = arguments[_key4];
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
        prop = this.properties[name] = new PropertyStub();

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
        Object.defineProperty(this.instance, name, { value: stub(), enumerable: true });
        method = this.instance[name];
      }

      //(2) add response
      method.stub.respond(i, config);
    }
  }]);

  return ObjectStub;
})();

exports.ObjectStub = ObjectStub;
var assert = require("assert");

/**
 * A response: arguments and error to throw or value to return.
 *
 * @readonly arguments:object[]	The arguments. It can be null.
 * @readonly error:object				The object to throw.
 * @readonly value:object				The object to return.
 */

var Response = (function () {
  /**
   * Constructor.
   *
   * @param config:object	The configuration object: args, error and value.
   */

  function Response() {
    var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Response);

    //(1) pre: arguments
    if (config.hasOwnProperty("error") && config.hasOwnProperty("value")) {
      throw new Error("Only 'error' or 'value' can set.");
    }

    //(2) init
    Object.defineProperty(this, "arguments", { value: config.args || null, enumerable: true });
    Object.defineProperty(this, "error", { value: config.error, enumerable: true });
    Object.defineProperty(this, "value", { value: config.value, enumerable: true });
  }

  /**
   * A response collection indexed by arguments.
   *
   * @readonly(protected) responses:Response[]	The responses.
   */

  /**
   * The action to run: throw or return.
   */

  _createClass(Response, [{
    key: "isResponseTo",

    /**
     * Returns if the response is a response to the specified argumentd.
     *
     * @param args:Object[]	The arguments to check.
     * @return boolean
     */
    value: function isResponseTo(args) {
      var res;

      //(1) arguments
      if (!args) args = [];

      //(1) check
      if (!this.arguments) {
        res = true;
      } else {
        try {
          assert.deepEqual(this.arguments, args);
          res = true;
        } catch (e) {
          res = false;
        }
      }

      //(2) return
      return res;
    }
  }, {
    key: "action",
    get: function get() {
      return this.error ? "throw" : "return";
    }
  }]);

  return Response;
})();

exports.Response = Response;

var ArguedResponses = (function () {
  /**
   * Constructor.
   */

  function ArguedResponses() {
    _classCallCheck(this, ArguedResponses);

    Object.defineProperty(this, "responses", { value: [] });
  }

  /**
   * A response collection by index.
   *
   * @readonly(protected) responses	The response list.
   */

  /**
   * The number of responses.
   *
   * @private
   * @type number
   */

  _createClass(ArguedResponses, [{
    key: "add",

    /**
     * @alias push
     */
    value: function add(res) {
      this.responses.push(res);
    }

    /**
     * Finds the response for the specified arguments.
     * If no response is found, it returns undefined.
     *
     * @param args:Object[]	The arguments.
     * @return Response
     */
  }, {
    key: "find",
    value: function find(args) {
      var res;

      //(1) find
      for (var i = 0; i < this.length; ++i) {
        var r = this.responses[i];

        if (r.isResponseTo(args)) {
          res = r;
          break;
        }
      }

      //(2) return
      return res;
    }
  }, {
    key: "length",
    get: function get() {
      return this.responses.length;
    }
  }]);

  return ArguedResponses;
})();

exports.ArguedResponses = ArguedResponses;

var IndexedResponses = (function () {
  /**
   * Constructor.
   */

  function IndexedResponses() {
    _classCallCheck(this, IndexedResponses);

    Object.defineProperty(this, "responses", { value: [] });
  }

  /**
   * A response collection.
   *
   * @attr(protected) default:Response               The default response.
   * @readonly(protected) indexed:IndexedResponses  The indexed responses.
   * @readonly(protected) argued:ArguedResponses    The argued responses.
   */

  /**
   * The number of responses.
   */

  _createClass(IndexedResponses, [{
    key: "add",

    /**
     * Adds a response in a determined position.
     *
     * @param i:number			The position.
     * @param res:Response	The response to add.
     */
    value: function add(i, res) {
      if (this.length == i) {
        this.responses.push(res);
      } else if (this.length > i) {
        this.responses[i] = res;
      } else {
        for (var x = this.length; x < i; ++x) {
          this.responses.push(undefined);
        }
        this.responses.push(res);
      }
    }

    /**
     * Returns the response.
     *
     * @param i:number	The index.
     * @return Response
     */
  }, {
    key: "find",
    value: function find(i) {
      return this.responses[i];
    }
  }, {
    key: "length",
    get: function get() {
      return this.responses.length;
    }
  }]);

  return IndexedResponses;
})();

exports.IndexedResponses = IndexedResponses;

var Responses = (function () {
  /**
   * Constructor.
   */

  function Responses() {
    _classCallCheck(this, Responses);

    Object.defineProperty(this, "default", { value: undefined, writable: true });
    Object.defineProperty(this, "indexed", { value: new IndexedResponses() });
    Object.defineProperty(this, "argued", { value: new ArguedResponses() });
  }

  /**
   * Returns the response.
   *
   * @param callCount:number  The number of call.
   * @param args:object[]	    The arguments passed to the call.
   * @return Response
   */

  _createClass(Responses, [{
    key: "find",
    value: function find(callCount, args) {
      var res;

      //(1) get response
      res = this.indexed.find(callCount);
      if (!res) res = this.argued.find(args);
      if (!res) res = this["default"];

      //(2) return
      return res;
    }

    /**
     * Adds a new response.
     *
     * @overload
     * @param res:Response  The argued response to add.
     *
     * @overload
     * @param i:number      The index/position.
     * @param res:Response  The indexed response to add.
     */
  }, {
    key: "add",
    value: function add() {
      var i, res;

      //(1) arguments

      for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      if (args.length == 1) res = args[0];else {
        ;

        i = args[0];
        res = args[1];
      } //(2) add
      if (i !== undefined && i !== null) {
        this.indexed.add(i, res);
      } else {
        if (!res.arguments) this["default"] = res;else this.argued.add(res);
      }
    }
  }]);

  return Responses;
})();

exports.Responses = Responses;
