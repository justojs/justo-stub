/**
 * A response collection indexed by arguments.
 *
 * @readonly(protected) responses:Response[]	The responses.
 */
export class ArguedResponses {
	/**
	 * Constructor.
	 */
	constructor() {
		Object.defineProperty(this, "responses", {value: []});
	}

	/**
	 * The number of responses.
	 *
	 * @private
	 * @type number
	 */
	get length() {
		return this.responses.length;
	}

	/**
	 * @alias push
	 */
	add(res) {
		this.responses.push(res);
	}

	/**
	 * Finds the response for the specified arguments.
	 * If no response is found, it returns undefined.
	 *
	 * @param args:Object[]	The arguments.
	 * @return Response
	 */
	find(args) {
		var res;

		//(1) find
		for (let i = 0; i < this.length; ++i) {
			let r = this.responses[i];

			if (r.isResponseTo(args)) {
				res = r;
				break;
			}
		}

		//(2) return
		return res;
	}
}
