//imports
const justo = require("justo-stub");
const stub = justo.stub;

//suite
describe("#stub()", function() {
	describe("Function stub", function() {
		it("stub()", function() {
			var double = stub();
			double.must.be.instanceOf(Function);
			double.stub.constructor.name.must.be.eq("FunctionStub");
		});
	});

	describe("Object stub", function() {
		it("stub(instance)", function() {
			var instance = {};
			var double = stub(instance);
      double.must.be.same(instance);
			double.stub.constructor.name.must.be.eq("ObjectStub");
		});
	});
});
