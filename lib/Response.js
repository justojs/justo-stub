//imports
import assert from "assert";

/**
 * A response: arguments and error to throw or value to return.
 *
 * @readonly arguments:object[]	The arguments. It can be null.
 * @readonly error:object				The object to throw.
 * @readonly value:object				The object to return.
 */
export default class Response {
	/**
	 * Constructor.
	 *
	 * @param config:object	The configuration object: args, error and value.
	 */
	constructor(config = {}) {
		//(1) pre: arguments
		if (config.hasOwnProperty("error") && config.hasOwnProperty("value")) {
			throw new Error("Only 'error' or 'value' can set.");
		}

		//(2) init
		Object.defineProperty(this, "arguments", {value: config.args || null, enumerable: true});
		Object.defineProperty(this, "error", {value: config.error, enumerable: true});
		Object.defineProperty(this, "value", {value: config.value, enumerable: true});
	}

	/**
	 * The action to run: throw or return.
	 */
	get action() {
		return this.error ? "throw" : "return";
	}

	/**
	 * Returns if the response is a response to the specified argumentd.
	 *
	 * @param args:Object[]	The arguments to check.
	 * @return boolean
	 */
	isResponseTo(args) {
		var res;

		//(1) arguments
		if (!args) args = [];

		//(1) check
		if (!this.arguments) {
			res = true;
		} else {
			try {
				assert.deepEqual(this.arguments, args);
				res = true;
			} catch (e) {
				res = false;
			}
		}

		//(2) return
		return res;
	}
}
