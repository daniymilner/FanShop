﻿"use strict";

angular.module('shopApp').controller('adminMenuController',
	['$scope', '$rootScope', 'Auth', function ($scope, $rootScope, Auth) {
	    $rootScope.$on('$stateChangeStart', function (event, toState) {
	        if ((toState.isSecure && !Auth.isAuthenticated()) || (toState.isAdmin && !Auth.isAdmin())) {
	            event.preventDefault();
	        }
	    });
	}]);