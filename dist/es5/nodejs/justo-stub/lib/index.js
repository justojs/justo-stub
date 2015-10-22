//imports
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = stub;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _FunctionStub = require("./FunctionStub");

var _FunctionStub2 = _interopRequireDefault(_FunctionStub);

var _ObjectStub = require("./ObjectStub");

var _ObjectStub2 = _interopRequireDefault(_ObjectStub);

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

  Object.defineProperty(res, "stub", { value: new _FunctionStub2["default"]() });

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
  Object.defineProperty(obj, "stub", { value: new _ObjectStub2["default"](obj) });

  for (var i = 0, names = Object.keys(members); i < names.length; ++i) {
    var _name = names[i];
    var value = members[_name];

    if (value.constructor.name != "Object") value = { value: value };

    obj.stub.respond(_name, value);
  }

  //(2) return
  return obj;
}
module.exports = exports["default"];
