"use strict";

angular.module('shopApp').controller('foggotController',
	['$scope', '$rootScope', function ($scope, $rootScope) {
	    $scope.email = '';
	    $scope.send = function () {
	        console.log($scope.email);
	    };
	}]);