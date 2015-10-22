//imports
const stub = require("../../../../dist/es5/nodejs/justo-stub");

//suite
describe("ObjectStub", function() {
  var instance, double;

  beforeEach(function() {
    instance = {};
    double = stub(instance);
  });

  describe("#constructor()", function() {
    it("constructor()", function() {
      double.must.be.same(instance);
      instance.stub.instance.must.be.same(instance);
      instance.stub.properties.must.be.eq({});
    });
  });

  describe("Methods", function() {
    describe("#respond()", function() {
      it("respond(name, config) - argued", function() {
        instance.stub.respond("sum()", {args: [1, 2], value: 3});

        instance.sum.must.be.instanceOf(Function);
        instance.sum.stub.constructor.name.must.be.eq("FunctionStub");
        instance.sum.stub.responses.indexed.length.must.be.eq(0);
        instance.sum.stub.responses.argued.length.must.be.eq(1);
        instance.sum.stub.responses.must.have({default: undefined});
      });

      it("respond(name, config) - default", function() {
        instance.stub.respond("sum()", {value: "default"});

        instance.sum.must.be.instanceOf(Function);
        instance.sum.stub.constructor.name.must.be.eq("FunctionStub");
        instance.sum.stub.responses.indexed.length.must.be.eq(0);
        instance.sum.stub.responses.argued.length.must.be.eq(0);
        instance.sum.stub.responses.default.must.have({value: "default"});
      });

      it("respond(name, i, config)", function() {
        instance.stub.respond("sum()", 0, {value: 1});

        instance.sum.must.be.instanceOf(Function);
        instance.sum.stub.constructor.name.must.be.eq("FunctionStub");
        instance.sum.stub.responses.indexed.length.must.be.eq(1);
        instance.sum.stub.responses.argued.length.must.be.eq(0);
        instance.sum.stub.responses.must.have({default: undefined});
      });

      it("respond(name, config) - several responses for different methods", function() {
        instance.stub.respond("sum()", {value: "defaultSum"});
        instance.stub.respond("sub()", {value: "defaultSub"});

        instance.sum.must.be.instanceOf(Function);
        instance.sum.stub.constructor.name.must.be.eq("FunctionStub");
        instance.sum.stub.responses.indexed.length.must.be.eq(0);
        instance.sum.stub.responses.argued.length.must.be.eq(0);
        instance.sum.stub.responses.default.must.have({value: "defaultSum"});

        instance.sub.must.be.instanceOf(Function);
        instance.sub.stub.constructor.name.must.be.eq("FunctionStub");
        instance.sub.stub.responses.indexed.length.must.be.eq(0);
        instance.sub.stub.responses.argued.length.must.be.eq(0);
        instance.sub.stub.responses.default.must.have({value: "defaultSub"});
      });

      it("respond(name, config) - several responses for same method", function() {
        instance.stub.respond("sum()", {args: [], value: 0});
        instance.stub.respond("sum()", {args: [1, 2], value: 3});

        instance.sum.must.be.instanceOf(Function);
        instance.sum.stub.constructor.name.must.be.eq("FunctionStub");
        instance.sum.stub.responses.indexed.length.must.be.eq(0);
        instance.sum.stub.responses.argued.length.must.be.eq(2);
        instance.sum.stub.responses.must.have({default: undefined});
      });
    });

    describe("Call", function() {
      describe("Indexed", function() {
        beforeEach(function() {
          instance.stub.respond("sum()", 0, {value: 1});
          instance.stub.respond("sum()", 1, {value: 2});
        });

        it("call 0", function() {
          instance.sum().must.be.eq(1);
          instance.sum.stub.callCount.must.be.eq(1);
        });

        it("call 0 and 1", function() {
          instance.sum().must.be.eq(1);
          instance.sum.stub.callCount.must.be.eq(1);

          instance.sum().must.be.eq(2);
          instance.sum.stub.callCount.must.be.eq(2);
        });

        it("call out of range", function() {
          instance.sum();
          instance.sum();
          instance.sum();
        });
      });

      describe("Argued", function() {
        beforeEach(function() {
          instance.stub.respond("sum()", {args: [], value: 0});
          instance.stub.respond("sum()", {args: [1], value: 1});
          instance.stub.respond("sum()", {args: [1, 2], value: 3});
        });

        it("Call 0", function() {
          instance.sum().must.be.eq(0);
        });

        it("Call 1", function() {
          instance.sum(1).must.be.eq(1);
        });

        it("Call 2", function() {
          instance.sum(1, 2).must.be.eq(3);
        });

        it("Several calls", function() {
          instance.sum().must.be.eq(0);
          instance.sum(1, 2).must.be.eq(3);
          instance.sum(1).must.be.eq(1);
          instance.sum.stub.callCount.must.be.eq(3);
        });
      });

      describe("Mixed", function() {
        beforeEach(function() {
          instance.stub.respond("sum()", 0, {value: "i0"});
          instance.stub.respond("sum()", 2, {value: "i2"});
          instance.stub.respond("sum()", {value: "default"});
          instance.stub.respond("sum()", {args: [], value: 0});
          instance.stub.respond("sum()", {args: [1], value: 1});
          instance.stub.respond("sum()", {args: [1, 2], value: 3});
        });

        it("Call #0", function() {
          instance.sum(1, 2).must.be.eq("i0");
        });

        it("Call #1", function() {
          instance.sum(1, 2).must.be.eq("i0");
          instance.sum(1, 2).must.be.eq(3);
        });

        it("Call #2", function() {
          instance.sum(1, 2).must.be.eq("i0");
          instance.sum(1, 2).must.be.eq(3);
          instance.sum(1, 2).must.be.eq("i2");
        });

        it("Default call", function() {
          instance.sum(1, 2, 3).must.be.eq("i0");
          instance.sum(1, 2, 3).must.be.eq("default");
        });
      });
    });
  });

  describe("Attributes", function() {
    describe("#respond()", function() {
      it("respond(name, config) - default", function() {
        instance.stub.respond("@count", {value: 1});

        instance.must.have("count");
        instance.stub.properties.count.constructor.name.must.be.eq("PropertyStub");
        instance.stub.properties.count.responses.indexed.length.must.be.eq(0);
        instance.stub.properties.count.responses.default.must.have({value: 1});
      });

      it("respond(name, config) - indexed 1", function() {
        instance.stub.respond("@count", 0, {value: 1});
        instance.stub.respond("@count", 1, {value: 2});

        instance.must.have("count");
        instance.stub.properties.count.constructor.name.must.be.eq("PropertyStub");
        instance.stub.properties.count.responses.indexed.length.must.be.eq(2);
        instance.stub.properties.count.responses.indexed.responses[0].must.have({value: 1});
        instance.stub.properties.count.responses.indexed.responses[1].must.have({value: 2});
        instance.stub.properties.count.responses.must.have({default: undefined});
      });
    });

    describe("Call", function() {
      beforeEach(function() {
        instance.stub.respond("@count", 0, {value: 1});
        instance.stub.respond("@count", 2, {value: 3});
        instance.stub.respond("@count", {value: "default"});
      });

      it("Call #0", function() {
        instance.count.must.be.eq(1);
      });

      it("Call #1", function() {
        instance.count.must.be.eq(1);
        instance.count.must.be.eq("default");
      });

      it("Call #2", function() {
        instance.count.must.be.eq(1);
        instance.count.must.be.eq("default");
        instance.count.must.be.eq(3);
      });

      it("Call #3", function() {
        instance.count.must.be.eq(1);
        instance.count.must.be.eq("default");
        instance.count.must.be.eq(3);
        instance.count.must.be.eq("default");
      });
    });
  });
});
