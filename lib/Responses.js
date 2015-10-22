//imports
import IndexedResponses from "./IndexedResponses";
import ArguedResponses from "./ArguedResponses";

/**
 * A response collection.
 *
 * @attr(protected) default:Response               The default response.
 * @readonly(protected) indexed:IndexedResponses  The indexed responses.
 * @readonly(protected) argued:ArguedResponses    The argued responses.
 */
export default class Responses {
  /**
   * Constructor.
   */
  constructor()  {
    Object.defineProperty(this, "default", {value: undefined, writable: true});
    Object.defineProperty(this, "indexed", {value: new IndexedResponses()});
    Object.defineProperty(this, "argued", {value: new ArguedResponses()});
  }

  /**
   * Returns the response.
   *
   * @param callCount:number  The number of call.
   * @param args:object[]	    The arguments passed to the call.
   * @return Response
   */
  find(callCount, args) {
    var res;

    //(1) get response
    res = this.indexed.find(callCount);
    if (!res) res = this.argued.find(args);
    if (!res) res = this.default;

    //(2) return
    return res;
  }

  /**
   * Adds a new response.
   *
   * @overload
   * @param res:Response  The argued response to add.
   *
   * @overload
   * @param i:number      The index/position.
   * @param res:Response  The indexed response to add.
   */
  add(...args) {
    var i, res;

    //(1) arguments
    if (args.length == 1) res = args[0];
    else [i, res] = args;

    //(2) add
    if (i !== undefined && i !== null) {
      this.indexed.add(i, res);
    } else {
      if (!res.arguments) this.default = res;
      else this.argued.add(res);
    }
  }
}
