//imports
const stub = require("../../../dist/es5/nodejs/justo-stub");

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

		describe("stub(obj, members)", function() {
			it("stub(obj, members) - with values as object", function() {
				var double = stub(obj, {"@time": {value: 123}});
				double.must.be.same(obj);
				double.stub.must.be.instanceOf("ObjectStub");
				double.must.have("time");
				double.time.must.be.eq(123);
			});

			describe("stub(obj, members) - with values != object", function() {
				it("Number", function() {
					var double = stub(obj, {"@time": 123});
					double.must.be.same(obj);
					double.stub.must.be.instanceOf("ObjectStub");
					double.must.have("time");
					double.time.must.be.eq(123);
				});

				it("Array", function() {
					var double = stub(obj, {"@items": [0, 1, 2]});
					double.must.be.same(obj);
					double.stub.must.be.instanceOf("ObjectStub");
					double.must.have("items");
					double.items.must.be.eq([0, 1, 2]);
				});

				it("Custom class", function() {
					function Point(x, y) { this.x = x; this.y = y; }
					var double = stub(obj, {"@point": new Point(1, 2)});
					double.must.be.same(obj);
					double.stub.must.be.instanceOf("ObjectStub");
					double.must.have("point");
					double.point.must.be.eq(new Point(1, 2));
				});
			});
		});
	});
});
