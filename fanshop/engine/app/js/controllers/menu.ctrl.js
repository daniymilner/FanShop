"use strict";

angular.module('shopApp').controller('menuController',
	['$scope', '$rootScope','Auth', function ($scope, $rootScope, Auth) {
	    $rootScope.$on('$stateChangeStart', function (event, toState) {
	        if (toState.isSecure && !Auth.isAuthenticated()) {
	            event.preventDefault();
	        }
	    });
	}]);