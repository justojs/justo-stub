/**
 * A response collection indexed by arguments.
 *
 * @readonly(protected) responses:Response[]	The responses.
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ArguedResponses = (function () {
	/**
  * Constructor.
  */

	function ArguedResponses() {
		_classCallCheck(this, ArguedResponses);

		Object.defineProperty(this, "responses", { value: [] });
	}

	/**
  * The number of responses.
  *
  * @private
  * @type number
  */

	_createClass(ArguedResponses, [{
		key: "add",

		/**
   * @alias push
   */
		value: function add(res) {
			this.responses.push(res);
		}

		/**
   * Finds the response for the specified arguments.
   * If no response is found, it returns undefined.
   *
   * @param args:Object[]	The arguments.
   * @return Response
   */
	}, {
		key: "find",
		value: function find(args) {
			var res;

			//(1) find
			for (var i = 0; i < this.length; ++i) {
				var r = this.responses[i];

				if (r.isResponseTo(args)) {
					res = r;
					break;
				}
			}

			//(2) return
			return res;
		}
	}, {
		key: "length",
		get: function get() {
			return this.responses.length;
		}
	}]);

	return ArguedResponses;
})();

exports["default"] = ArguedResponses;
module.exports = exports["default"];
