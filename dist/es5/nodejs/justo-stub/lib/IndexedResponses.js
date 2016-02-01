"use strict";var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();Object.defineProperty(exports, "__esModule", { value: true });function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var 




IndexedResponses = function () {



	function IndexedResponses() {_classCallCheck(this, IndexedResponses);
		Object.defineProperty(this, "responses", { value: [] });}_createClass(IndexedResponses, [{ key: "add", value: function add(















		i, res) {
			if (this.length == i) {
				this.responses.push(res);} else 
			if (this.length > i) {
				this.responses[i] = res;} else 
			{
				for (var x = this.length; x < i; ++x) {
					this.responses.push(undefined);}

				this.responses.push(res);}} }, { key: "find", value: function find(









		i) {
			return this.responses[i];} }, { key: "length", get: function get() {return this.responses.length;} }]);return IndexedResponses;}();exports.default = IndexedResponses;
