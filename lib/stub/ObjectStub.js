/**
 * A stub for an instance object.
 *
 * @readonly(protected) instance:object   The instance object to double.
 * @readonly(protected) properties:object The doubled properties.
 */
export class ObjectStub {
  /**
   * Constructor.
   *
   * @param(attr) instance
   */
  constructor(instance) {
    Object.defineProperty(this, "instance", {value: instance});
    Object.defineProperty(this, "properties", {value: {}});
  }

  /**
   * Defines a response.
   *
   * @overload Method response
   * @param name:string   The method  name to double.
   * @param config:object The configuration object: args, value and error.
   *
   * @overload Method indexed response
   * @param name:string   The method name to double.
   * @param i:number      The index.
   * @param config:object The configuration object: args, value and error.
   *
   * @overload Attribute and method response
   * @param name:string   The member name to double.
   * @param type:string   The member type to double: attr, attribute or method.
   * @param config:object The configuration object: args, value and error.
   *
   * @overload Attribute and method indexed response
   * @param name:string   The member name to double.
   * @param type: string  The member type to double: attr, attribute or method.
   * @param i:number      The index.
   * @param config:object The configuration object: args, value and error.
   */
  respond(name, ...args) {
    var type, i, config;

    //(1) arguments
    if (args.length === 0) {
      throw new Error("A stub config expected.");
    } else if (args.length == 1) {
      type = "method";
      config = args[0];
    } else if (args.length == 2) {
      if (typeof(args[0]) == "number") {
        type = "method";
        [i, config] = args;
      } else {
        [type, config] = args;
      }
    } else {
      [type, i, config] = args;
    }

    //(2) add response
    if (type == "attr" || type == "attribute") {
      this.respondAttribute(name, i, config);
    } else {
      this.respondMethod(name, i, config);
    }
  }

  /**
   * Defines an attribute response.
   *
   * @protected
   * @param name:string   The attribute name.
   * @param i:number      The index. If null, default response.
   * @param config:object The attribute configureation: error (object) or value (object).
   */
  respondAttribute(name, i, config) {
    var prop;

    //(1) get property stub
    prop = this.properties[name];

    if (!prop) {
      prop = this.properties[name] = new PropertyStub();

      Object.defineProperty(this.instance, name, {
        get: () => {
          return this.properties[name].call();
        },
        enumerable: true
      });
    }

    //(2) add response
    prop.respond(i, config);
  }

  /**
   * Defines a method response.
   *
   * @protected
   * @param name:string   The method name.
   * @param i:number      The index. If null, default or argued response.
   * @param config:object The configuration: args, error and value.
   */
  respondMethod(name, i, config) {
    var method;

    //(1) create stub
    method = this.instance[name];

    if (!method) {
      Object.defineProperty(this.instance, name, {value: stub(), enumerable: true});
      method = this.instance[name];
    }

    //(2) add response
    method.stub.respond(i, config);
  }
}
