/**
 * Creates a test stub.
 *
 * @overload Function stub
 * @noparam
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
 * @param instance:object		The instance object.
 */
function createObjectStub(instance) {
	Object.defineProperty(instance, "stub", {value: new ObjectStub(instance)});
	return instance;
}
