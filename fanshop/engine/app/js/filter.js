'use strict';

/* Filters */

angular.module('shopApp')
	.filter("asDate", function () {
	    return function (input) {
	        if (input) {
	            var replaced = new Date(parseInt(input.replace('/Date(', '').replace(')/', '')));
	            return replaced.toLocaleDateString() + ' ' + replaced.toLocaleTimeString();
	        }
	    }
	});
