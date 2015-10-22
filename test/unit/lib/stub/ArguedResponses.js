//imports
const assert = require("assert");
const stub = require("../../../../dist/es5/nodejs/justo-stub");
const ArguedResponses = require("../../../../dist/es5/nodejs/justo-stub/lib/ArguedResponses");
const Response = require("../../../../dist/es5/nodejs/justo-stub/lib/Response");

//suite
describe("ArguedResponses", function() {
	var list, emptyRes, argsRes;

	before(function() {
		emptyRes = new Response({args: []});
		argsRes = new Response({args: [1, 2]});
	});

	describe("#constructor()", function() {
		it("constructor()", function() {
			list = new ArguedResponses();
			list.responses.length.must.be.eq(0);
		});
	});

	describe("#add()", function() {
		beforeEach(function() {
			list = new ArguedResponses();
		});

		it("add(res) - empty args", function() {
			list.add(emptyRes);
			list.responses.length.must.be.eq(1);
			list.responses[0].must.be.same(emptyRes);
		});

		it("add(res) - with args", function() {
			list.add(argsRes);
			list.responses.length.must.be.eq(1);
			list.responses[0].must.be.same(argsRes);
		});

		it("add(res) - args, empty", function() {
			list.add(argsRes);
			list.add(emptyRes);
			list.responses.length.must.be.eq(2);
			list.responses[0].must.be.same(argsRes);
			list.responses[1].must.be.same(emptyRes);
		});

		it("add(res) - empty, args", function() {
			list.add(emptyRes);
			list.add(argsRes);
			list.responses.length.must.be.eq(2);
			list.responses[0].must.be.same(emptyRes);
			list.responses[1].must.be.same(argsRes);
		});
	});

	describe("#find()", function() {
		beforeEach(function() {
			list = new ArguedResponses();
		});

		it("find() - empty (1st response)", function() {
			list.add(emptyRes);
			list.add(argsRes);
			list.find([]).must.be.same(emptyRes);
		});

		it("find() - empty (non-1st response)", function() {
			list.add(argsRes);
			list.add(emptyRes);
			list.find([]).must.be.same(emptyRes);
		});

		it("find() - specific (1st response)", function() {
			list.add(argsRes);
			list.add(emptyRes);
			list.find([1, 2]).must.be.same(argsRes);
		});

		it("find() - specific (non-1st response", function() {
			list.add(emptyRes);
			list.add(argsRes);
			list.find([1, 2]).must.be.same(argsRes);
		});

		it("find() - none", function() {
			list.add(emptyRes);
			list.add(argsRes);
			assert(list.find([1, 2, 3, 4]) === undefined);
		});
	});
});
