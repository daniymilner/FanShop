"use strict";

angular.module('shopApp').controller('loginController',
	['$scope', '$rootScope', function ($scope, $rootScope) {
	    $scope.user = {
	        login: '',
	        password: ''
	    };
	    $scope.signIn = function () {
	        console.log($scope.user);
	    };
	}]);