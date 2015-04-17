/**
 * Base for the callable objects.
 *
 * @abstract
 * @attr(protected) callCount:number  The current number of calls.
 */
class CallableStub {
  /**
   * Constructor.
   */
  constructor() {
    Object.defineProperty(this, "responses", {value: new Responses()});
    Object.defineProperty(this, "callCount", {value: 0, writable: true});
  }

  /**
   * Defines a response.
   *
   * @overload
   * @param call:object	The call info: args and error or value.
   *
   * @overload
   * @param i:number		The number of call.
   * @param call:object	The call info: args and error or value.
   */
  respond(...args) {
    var i, call, res;

    //(1) arguments
    if (args.length == 1) {
      call = args[0];
    } else {
      [i, call] = args;
    }

    //(2) add response
    res = new Response(call);

    if (typeof(i) == "number") this.responses.add(i, res);
    else this.responses.add(res);
  }

  /**
   * Calls the stub.
   *
   * @protected
   * @param args:object[]	The arguments passed to the call.
   */
  call(args) {
    var res;

    //(1) get response
    res = this.responses.find(this.callCount, args);
    this.callCount += 1;

    //(2) respond
    if (res) {
      if (res.action == "throw") throw res.error;
      else return res.value;
    } else {
      return undefined;
    }
  }
}
