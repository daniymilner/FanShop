"use strict";

angular.module('shopApp').controller('contactsController',
	['$scope', '$rootScope', function ($scope, $rootScope) {
	    $scope.data = {
	        name: '',
	        email: '',
	        message: ''
	    };
	    $scope.submit = function () {
	        console.log($scope.data);
	    };
	}]);