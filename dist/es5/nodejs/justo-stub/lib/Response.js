//imports
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

/**
 * A response: arguments and error to throw or value to return.
 *
 * @readonly arguments:object[]	The arguments. It can be null.
 * @readonly error:object				The object to throw.
 * @readonly value:object				The object to return.
 */

var Response = (function () {
	/**
  * Constructor.
  *
  * @param config:object	The configuration object: args, error and value.
  */

	function Response() {
		var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

		_classCallCheck(this, Response);

		//(1) pre: arguments
		if (config.hasOwnProperty("error") && config.hasOwnProperty("value")) {
			throw new Error("Only 'error' or 'value' can set.");
		}

		//(2) init
		Object.defineProperty(this, "arguments", { value: config.args || null, enumerable: true });
		Object.defineProperty(this, "error", { value: config.error, enumerable: true });
		Object.defineProperty(this, "value", { value: config.value, enumerable: true });
	}

	/**
  * The action to run: throw or return.
  */

	_createClass(Response, [{
		key: "isResponseTo",

		/**
   * Returns if the response is a response to the specified argumentd.
   *
   * @param args:Object[]	The arguments to check.
   * @return boolean
   */
		value: function isResponseTo(args) {
			var res;

			//(1) arguments
			if (!args) args = [];

			//(1) check
			if (!this.arguments) {
				res = true;
			} else {
				try {
					_assert2["default"].deepEqual(this.arguments, args);
					res = true;
				} catch (e) {
					res = false;
				}
			}

			//(2) return
			return res;
		}
	}, {
		key: "action",
		get: function get() {
			return this.error ? "throw" : "return";
		}
	}]);

	return Response;
})();

exports["default"] = Response;
module.exports = exports["default"];
