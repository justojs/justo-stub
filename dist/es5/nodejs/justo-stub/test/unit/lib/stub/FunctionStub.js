//imports
const assert = require("assert");
const sinon = require("sinon");
const justo = require("justo-stub");
const stub = justo.stub;
const FunctionStub = justo.FunctionStub;

//suite
describe("FunctionStub", function() {
	var s;

	beforeEach(function() {
		s = stub();
	});

	describe("#respond()", function() {
		beforeEach(function() {
			s.stub.responses.add = sinon.spy();
		});

		it("respond(i, call)", function() {
			s.stub.respond(0, {value: "one"});
			s.stub.responses.add.callCount.must.be.eq(1);
			s.stub.responses.add.firstCall.args.must.be.eq([0, {arguments: null, error: undefined, value: "one"}]);
		});

		it("respond(call)", function() {
			s.stub.respond({value: "one"});
			s.stub.responses.add.callCount.must.be.eq(1);
			s.stub.responses.add.firstCall.args.must.be.eq([{arguments: null, error: undefined, value: "one"}]);
		});
	});

	describe("Call", function() {
		describe("Indexed", function() {
			beforeEach(function() {
				s.stub.respond(0, {value: "one"});
				s.stub.respond(1, {value: "two"});
			});

			it("once", function() {
				s().must.be.eq("one");
				s.stub.callCount.must.be.eq(1);
			});

			it("two", function() {
				s();
				s().must.be.eq("two");
				s.stub.callCount.must.be.eq(2);
			});

			it("three - out of range", function() {
				s();
				s();
				assert(s() === undefined);
				s.stub.callCount.must.be.eq(3);
			});
		});

		describe("Argued", function() {
			beforeEach(function() {
				s.stub.respond({args: [1], value: 1});
				s.stub.respond({args: [1, 2], value: 3});
			});

			it("default", function() {
				s.stub.respond({value: "default"});

				s(1, 2, 3).must.be.eq("default");
				s.stub.callCount.must.be.eq(1);
			});

			it("specific", function() {
				s(1, 2).must.be.eq(3);
				s.stub.callCount.must.be.eq(1);
			});

			it("undefined - with no default response", function() {
				assert(s(1, 2, 3) === undefined);
				s.stub.callCount.must.be.eq(1);
			});
		});

		describe("Mixed", function() {
			beforeEach(function() {
				s.stub.respond(0, {value: "one"});
				s.stub.respond(2, {value: "three"});
				s.stub.respond({value: "default"});
				s.stub.respond({args: [1, 2], value: 3});
				s.stub.respond({args: [1, 3], value: 4});
			});

			it("Indexed", function() {
				s(1, 2).must.be.eq("one");
			});

			it("Indexed, argued", function() {
				s(1, 2).must.be.eq("one");
				s(1, 2).must.be.eq(3);
			});

			it("Indexed, argued, indexed", function() {
				s(1, 2).must.be.eq("one");
				s(1, 2).must.be.eq(3);
				s(1, 2).must.be.eq("three");
			});

			it("Indexed, default", function() {
				s(1, 2, 3).must.be.eq("one");
				s(1, 2, 3).must.be.eq("default");
			});
		});

		describe("throw", function() {
			beforeEach(function() {
				s.stub.respond({error: new Error("default")});
			});

			it("throw", function() {
				(function() {
					s();
				}).must.raise("default");
			});
		});

		describe("return", function() {
			beforeEach(function() {
				s.stub.respond({value: "default"});
			});

			it("return", function() {
				s().must.be.eq("default");
			});
		});

		describe("return", function() {

		});
	});
});
