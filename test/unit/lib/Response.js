//imports
const stub = require("../../../dist/es5/nodejs/justo-stub");
const Response = require("../../../dist/es5/nodejs/justo-stub/lib/Response").default;

//suite
describe("Response", function() {
	describe("#constructor()", function() {
		describe("Error handling", function() {
			it("constructor({error: 'myerror', value: 'myvalue'}) - only one can be indicated", function() {
				(function() {
					var res = new Response({error: "myerror", value: "myvalue"});
				}).must.raise("Only 'error' or 'value' can set.");
			});
		});

		it("constructor()", function() {
			var res = new Response();

			res.must.have({arguments: null, error: undefined, value: undefined});
			res.action.must.be.eq("return");
		});

		it("constructor({error: 'myerror'})", function() {
			var res = new Response({error: "myerror"});

			res.must.have({arguments: null, error: "myerror", value: undefined});
			res.action.must.be.eq("throw");
		});

		it("constructor({value: 'myvalue'})", function() {
			var res = new Response({value: "myvalue"});

			res.must.have({arguments: null, error: undefined, value: "myvalue"});
			res.action.must.be.eq("return");
		});

		it("constructor({args: [1, 2, 3], value: 6})", function() {
			var res = new Response({args: [1, 2, 3], value: 6});

			res.must.have({arguments: [1, 2, 3], value: 6});
			res.action.must.be.eq("return");
		});
	});

	describe("#isResponseTo()", function() {
		describe("Response with null arguments", function() {
			var res;

			before(function() {
				res = new Response();
			});

			it("isResponseTo()", function() {
				res.isResponseTo().must.be.eq(true);
			});

			it("isResponseTo([])", function() {
				res.isResponseTo([]).must.be.eq(true);
			});

			it("isResponseTo([arg1])", function() {
				res.isResponseTo([1]).must.be.eq(true);
			});

			it("isResponseTo([arg1, arg2])", function() {
				res.isResponseTo([1, 2]).must.be.eq(true);
			});
		});

		describe("Response with empty arguments", function() {
			var res;

			before(function() {
				res = new Response({args: []});
			});

			it("isResponseTo()", function() {
				res.isResponseTo().must.be.eq(true);
			});

			it("isResponseTo([])", function() {
				res.isResponseTo([]).must.be.eq(true);
			});

			it("isResponseTo([arg1])", function() {
				res.isResponseTo([1]).must.be.eq(false);
			});

			it("isResponseTo([arg1, arg2])", function() {
				res.isResponseTo([1, 2]).must.be.eq(false);
			});
		});

		describe("Response with arguments", function() {
			var res;

			before(function() {
				res = new Response({args: [1, {value: 2}]});
			});

			it("isResponseTo()", function() {
				res.isResponseTo().must.be.eq(false);
			});

			it("isResponseTo([])", function() {
				res.isResponseTo([]).must.be.eq(false);
			});

			it("isResponseTo([1])", function() {
				res.isResponseTo([1]).must.be.eq(false);
			});

			it("isResponseTo([1, 2])", function() {
				res.isResponseTo([1, 2]).must.be.eq(false);
			});

			it("isResponseTo([1, {value: 2}])", function() {
				res.isResponseTo([1, {value: 2}]).must.be.eq(true);
			});

			it("isResponseTo([2, 1])", function() {
				res.isResponseTo([2, 1]).must.be.eq(false);
			});
		});
	});
});
