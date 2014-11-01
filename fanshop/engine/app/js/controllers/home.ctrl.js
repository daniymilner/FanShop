"use strict";

angular.module('shopApp').controller('homeController',
	['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
	    $http({
	        method: "GET",
	        url: "/api/user/home"
	    }).success(function (data) {
	        console.log('success');
	    }).error(function (data) {
	        console.log('error');
	    });
	}]);