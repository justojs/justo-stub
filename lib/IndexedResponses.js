/**
 * A response collection by index.
 *
 * @readonly(protected) responses	The response list.
 */
export default class IndexedResponses {
	/**
	 * Constructor.
	 */
	constructor() {
		Object.defineProperty(this, "responses", {value: []});
	}

	/**
	 * The number of responses.
	 */
	get length() {
		return this.responses.length;
	}

	/**
	 * Adds a response in a determined position.
	 *
	 * @param i:number			The position.
	 * @param res:Response	The response to add.
	 */
	add(i, res) {
		if (this.length == i) {
			this.responses.push(res);
		} else if (this.length > i) {
			this.responses[i] = res;
	  } else {
			for (let x = this.length; x < i; ++x) {
				this.responses.push(undefined);
			}
			this.responses.push(res);
		}
	}

	/**
	 * Returns the response.
	 *
	 * @param i:number	The index.
	 * @return Response
	 */
	find(i) {
		return this.responses[i];
	}
}
