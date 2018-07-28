/*
Licensed Materials - Property of IBM

(C) Copyright IBM Corp. 2016. All Rights Reserved.

US Government Users Restricted Rights - Use, duplication or
disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
*/

(function(document) {
	'use strict';

	var app = document.querySelector('#app');

	/**
	 * format currency value
	 *
	 * @param  {[type]} val value
	 * @param  {[type]} c   decimal point
	 * @param  {[type]} d   decimal separator
	 * @param  {[type]} t   thousand separator
	 * @return {[type]}     [description]
	 */
	app.formatMoney = function(val, c, d, t) {
		var n = val;
		c = isNaN(c = Math.abs(c)) ? 2 : c;
		d = d === undefined ? '.' : d;
		t = t === undefined ? ',' : t;
		var s = n < 0 ? '-' : '';
		var i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + '';
		var j = (j = i.length) > 3 ? j % 3 : 0;
		return s + (j ? i.substr(0, j) + t : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : '');
	};

	/**
	 * Generate current base URL
	 * @return {[type]} [description]
	 */
	app.getBaseURL = function() {
		var url = window.location.href;
		var arr = url.split('/');
		return arr[0] + '//' + arr[2];
	};

	app.hostURI = app.getBaseURL();

})(document);
