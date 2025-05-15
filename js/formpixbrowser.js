(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.formPixAPI = {}));
})(this, (function (exports) { 'use strict';

	var FORM_PIX_URL = 'http://localhost:3000';
	var API_KEY = null;

	function login(url, key) {
		FORM_PIX_URL = url;
		API_KEY = key;
	}

	let reqOptions =
	{
		method: 'POST',
		headers: {
			'API': API_KEY,
			'Content-Type': 'application/json'
		}
	};

	function sendCommand(command, params, reqOptions) {
		fetch(`${FORM_PIX_URL}/api/${endpoint}?${params}`, reqOptions)
			.then((response) => {
				// Convert received data to JSON
				return response.json();
			})
			.then((data) => {
				// Log the data if the request is successful
				console.log(data);
			})
			.catch((err) => {
				// If there's a problem, handle it...
				if (err) console.log('connection closed due to errors:', err);
			});
	}

	function fill(color, start, length) {

		let params = new URLSearchParams({
			color: color,
			start: start,
			length: length
		}).toString();

		sendCommand('fill', params, reqOptions);
	}

	function gradient(startColor, endColor, start, length) {

		let params = new URLSearchParams({
			startColor: startColor,
			endColor: endColor,
			start: start,
			length: length
		}).toString();

		sendCommand('gradient', params, reqOptions);
	}

	function setPixel(location, color) {
		let params = new URLSearchParams({
			location: location,
			color: color
		}).toString();

		sendCommand('setPixel', params, reqOptions);
	}

	function setPixels(pixels) {
		let params = new URLSearchParams({
			pixels: pixels
		}).toString();

		sendCommand('setPixels', params, reqOptions);
	}

	function say(text, color, bgcolor) {

		let params = new URLSearchParams({
			text: text,
			textColor: color,
			backgroundColor: bgcolor
		}).toString();

		sendCommand('say', params, reqOptions);
	}

	function getSounds(type) {
		let getOptions =
		{
			method: 'GET',
			headers: {
				'API': API_KEY,
				'Content-Type': 'application/json'
			}
		};

		let params = new URLSearchParams({
			type: type
		}).toString();

		sendCommand('say', params, getOptions);

	}

	function playSound(sfx, bgm) {
		let params = new URLSearchParams({
			sfx: sfx,
			bgm: bgm
		}).toString();

		sendCommand('playSound', params, reqOptions);
	}

	var formpixapi = {
		login, fill, gradient, setPixel, setPixels, say, getSounds, playSound
	};
	var formpixapi_1 = formpixapi.login;
	var formpixapi_2 = formpixapi.fill;
	var formpixapi_3 = formpixapi.gradient;
	var formpixapi_4 = formpixapi.setPixel;
	var formpixapi_5 = formpixapi.setPixels;
	var formpixapi_6 = formpixapi.say;
	var formpixapi_7 = formpixapi.getSounds;
	var formpixapi_8 = formpixapi.playSound;

	exports.default = formpixapi;
	exports.fill = formpixapi_2;
	exports.getSounds = formpixapi_7;
	exports.gradient = formpixapi_3;
	exports.login = formpixapi_1;
	exports.playSound = formpixapi_8;
	exports.say = formpixapi_6;
	exports.setPixel = formpixapi_4;
	exports.setPixels = formpixapi_5;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
