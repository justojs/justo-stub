"use strict";var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();Object.defineProperty(exports, "__esModule", { value: true });var _assert = require("assert");var _assert2 = _interopRequireDefault(_assert);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var 









Response = function () {





	function Response() {var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];_classCallCheck(this, Response);

		if (config.hasOwnProperty("error") && config.hasOwnProperty("value")) {
			throw new Error("Only 'error' or 'value' can set.");}



		Object.defineProperty(this, "arguments", { value: config.args || null, enumerable: true });
		Object.defineProperty(this, "error", { value: config.error, enumerable: true });
		Object.defineProperty(this, "value", { value: config.value, enumerable: true });}_createClass(Response, [{ key: "isResponseTo", value: function isResponseTo(















		args) {
			var res;


			if (!args) args = [];


			if (!this.arguments) {
				res = true;} else 
			{
				try {
					_assert2.default.deepEqual(this.arguments, args);
					res = true;} 
				catch (e) {
					res = false;}}




			return res;} }, { key: "action", get: function get() {return this.error ? "throw" : "return";} }]);return Response;}();exports.default = Response;
