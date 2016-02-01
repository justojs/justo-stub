//imports
const assert = require("assert");
const stub = require("../../../dist/es5/nodejs/justo-stub");
const Response = require("../../../dist/es5/nodejs/justo-stub/lib/Response").default;
const Responses = require("../../../dist/es5/nodejs/justo-stub/lib/Responses").default;

//suite
describe("Responses", function() {
  var list, res, defaultRes, argsRes, emptyRes;

  before(function() {
    res = new Response();
    defaultRes = new Response();
    emptyRes = new Response({args: [], value: 0});
    argsRes = new Response({args: [1, 2], value: 3});
  });

  beforeEach(function() {
    list = new Responses();
  });

  describe("#constructor()", function() {
    it("constructor()", function() {
      list = new Responses();
      list.indexed.length.must.be.eq(0);
      list.argued.length.must.be.eq(0);
      list.must.have({default: undefined});
    });
  });

  describe("#add()", function() {
    describe("Indexed", function() {
      it("add(0, res)", function() {
        list.add(0, res);
        list.indexed.length.must.be.eq(1);
        list.indexed.responses[0].must.be.same(res);
        list.argued.length.must.be.eq(0);
        list.must.have({default: undefined});
      });

      it("add(1, res)", function() {
        list.add(1, res);
        list.indexed.length.must.be.eq(2);
        assert(list.indexed.responses[0] === undefined);
        list.indexed.responses[1].must.be.same(res);
        list.argued.length.must.be.eq(0);
        list.must.have({default: undefined});
      });

      it("add(1, res); add(0, res)", function() {
        list.add(1, res);
        list.add(0, emptyRes);
        list.indexed.length.must.be.eq(2);
        list.indexed.responses[0].must.be.same(emptyRes);
        list.indexed.responses[1].must.be.same(res);
        list.argued.length.must.be.eq(0);
        list.must.have({default: undefined});
      });
    });

    describe("Argued", function() {
      it("add(res)", function() {
        list.add(emptyRes);
        list.indexed.length.must.be.eq(0);
        list.argued.length.must.be.eq(1);
        list.argued.responses.must.be.eq([emptyRes]);
        list.must.have({default: undefined});
      });

      it("add(res); add(res);", function() {
        list.add(emptyRes);
        list.add(argsRes);
        list.indexed.length.must.be.eq(0);
        list.argued.length.must.be.eq(2);
        list.argued.responses.must.be.eq([emptyRes, argsRes]);
        list.must.have({default: undefined});
      });
    });

    describe("Default", function() {
      it("add(default)", function() {
  			list.add(defaultRes);
  			list.indexed.length.must.be.eq(0);
        list.argued.length.must.be.eq(0);
  			list.default.must.be.same(defaultRes);
  		});
    });
  });

  describe("#find()", function() {
    it("find(i, call) - return default response", function() {
      list.add(0, res);
      list.add(emptyRes);
      list.add(argsRes);
      list.add(defaultRes);
			list.find(1, [1, 2, 3, 4]).must.be.same(defaultRes);
		});

    it("find(i, call) - return indexed response", function() {
      list.add(0, res);
      list.add(argsRes);
      list.add(emptyRes);
      list.add(defaultRes);
      list.find(0, [1, 2, 3, 4]).must.be.same(res);
    });

    it("find(i, call) - return argued response", function() {
      list.add(0, res);
      list.add(argsRes);
      list.add(emptyRes);
      list.add(defaultRes);
      list.find(1, []).must.be.same(emptyRes);
    });

    it("find(i, call) - return argued response (another test)", function() {
      list.add(0, res);
      list.add(argsRes);
      list.add(emptyRes);
      list.add(defaultRes);
      list.find(1, [1, 2]).must.be.same(argsRes);
    });
  });
});
