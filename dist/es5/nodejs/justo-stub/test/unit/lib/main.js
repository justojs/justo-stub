//imports
const justo = require("../../../dist/es5/nodejs/justo-stub");
const stub = justo.stub;

//suite
describe("#stub()", function() {
	describe("Function stub", function() {
		it("stub()", function() {
			var double = stub();
			double.must.be.instanceOf(Function);
			double.stub.must.be.instanceOf("FunctionStub");
		});
	});

	describe("Object stub", function() {
		var obj;

		beforeEach(function() {
			obj = {};
		});

		it("stub(obj)", function() {
			var double = stub(obj);
      double.must.be.same(obj);
			double.stub.must.be.instanceOf("ObjectStub");
		});

		it("stub(obj, members)", function() {
			var double = stub(obj, {"@time": {value: 123}});
			double.must.be.same(obj);
			double.stub.must.be.instanceOf("ObjectStub");
			double.must.have("time");
		});
	});
});
