"use strict";var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();Object.defineProperty(exports, "__esModule", { value: true });function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var 




ArguedResponses = function () {



	function ArguedResponses() {_classCallCheck(this, ArguedResponses);
		Object.defineProperty(this, "responses", { value: [] });}_createClass(ArguedResponses, [{ key: "add", value: function add(















		res) {
			this.responses.push(res);} }, { key: "find", value: function find(









		args) {
			var res;


			for (var i = 0; i < this.length; ++i) {
				var r = this.responses[i];

				if (r.isResponseTo(args)) {
					res = r;
					break;}}




			return res;} }, { key: "length", get: function get() {return this.responses.length;} }]);return ArguedResponses;}();exports.default = ArguedResponses;
