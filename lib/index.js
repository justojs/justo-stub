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
export function stub(...args) {
  var double;

  //(1) create dummy
  if (args.length === 0) double = createFunctionStub();
  else double = createObjectStub(...args);

  //(2) return dummy
  return double;
}

/**
 * Creates a function stub.
 */
function createFunctionStub() {
  var res;

  //(1) create stub
  res = function(...args) {
    return res.stub.call(args);
  };

  Object.defineProperty(res, "stub", {value: new FunctionStub()});

  //(2) return
  return res;
}

/**
 * Creates an object dummy.
 *
 * @param obj:object        The object to double.
 * @param [members]:object  The members to double.
 */
function createObjectStub(obj, members = {}) {
  //(1) double
  Object.defineProperty(obj, "stub", {value: new ObjectStub(obj)});

  for (let i = 0, names = Object.keys(members); i < names.length; ++i) {
    let name = names[i];
    obj.stub.respond(name, members[name]);
  }

  //(2) return
  return obj;
}
