"use strict";

angular.module('shopApp').controller('contactsController',
	['$scope', '$http', function ($scope, $http) {
	    $scope.data = {
	        name: '',
	        email: '',
	        message: ''
	    };
	    $scope.submit = function () {
	        $http({
	            method: 'POST',
	            url: '/api/user/sendFeedback',
                data: $scope.data
	        }).success(function() {
	            $scope.success = true;
	        });
	    };
	}]);