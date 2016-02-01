"use strict";var _FunctionStub = require("./lib/FunctionStub");var _FunctionStub2 = _interopRequireDefault(_FunctionStub);var _ObjectStub = require("./lib/ObjectStub");var _ObjectStub2 = _interopRequireDefault(_ObjectStub);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}




module.exports = stub;













function stub() {
  var double;


  if (arguments.length === 0) double = createFunctionStub();else 
  double = createObjectStub.apply(undefined, arguments);


  return double;}





function createFunctionStub() {
  var _res;


  _res = function res() {for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {args[_key] = arguments[_key];}
    return _res.stub.call(args);};


  Object.defineProperty(_res, "stub", { value: new _FunctionStub2.default() });


  return _res;}








function createObjectStub(obj) {var members = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  Object.defineProperty(obj, "stub", { value: new _ObjectStub2.default(obj) });

  for (var i = 0, names = Object.keys(members); i < names.length; ++i) {
    var name = names[i];
    var value = members[name];

    if (value.constructor.name != "Object") value = { value: value };

    obj.stub.respond(name, value);}



  return obj;}
