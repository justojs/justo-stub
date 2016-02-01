//imports
const assert = require("assert");
const stub = require("../../../dist/es5/nodejs/justo-stub");
const IndexedResponses = require("../../../dist/es5/nodejs/justo-stub/lib/IndexedResponses").default;
const Response = require("../../../dist/es5/nodejs/justo-stub/lib/Response").default;

//suite
describe("IndexedResponses", function() {
	var list, res, res2, res3, res4;

	before(function() {
		res = new Response();
		res2 = new Response();
		res3 = new Response();
		res4 = new Response();
	});

	describe("#constructor()", function() {
		it("constructor()", function() {
			var list = new IndexedResponses();
			list.length.must.be.eq(0);
		});
	});

	describe("#add()", function() {
		beforeEach(function() {
			list = new IndexedResponses();
		});

		it("add(i, res) - first item", function() {
			list.add(0, res);
			list.length.must.be.eq(1);
			list.responses[0].must.be.same(res);
		});

		it("add(i, res) - with empty list at 2nd position", function() {
			list.add(1, res);
			list.length.must.be.eq(2);
			assert(list.responses[0] === undefined);
			list.responses[1].must.be.same(res);
		});

		it("add(i, res); add(i, res) - With gaps", function() {
			list.add(1, res);
			list.add(3, res2);
			list.length.must.be.eq(4);
			assert(list.responses[0] === undefined);
			list.responses[1].must.be.same(res);
			assert(list.responses[2] === undefined);
			list.responses[3].must.be.same(res2);
		});

		it("add(0, res); add(1, res)", function() {
			list.add(0, res);
			list.add(1, res2);
			list.length.must.be.eq(2);
			list.responses[0].must.be.same(res);
			list.responses[1].must.be.same(res2);
		});

		it("add(0, res); add(1, res); add(2, res); add(1, res)", function() {
			list.add(0, res);
			list.add(1, res2);
			list.add(2, res3);
			list.add(1, res4);
			list.length.must.be.eq(3);
			list.responses[0].must.be.same(res);
			list.responses[1].must.be.same(res4);
			list.responses[2].must.be.same(res3);
		});
	});

	describe("#find()", function() {
		before(function() {
			list = new IndexedResponses();

			list.add(1, res);
			list.add(3, res2);
		});

		it("find(i) - item to undefined", function() {
			assert(list.find(0) === undefined);
		});

		it("find(i) - item with respone", function() {
			list.find(1).must.be.same(res);
		});
	});
});
