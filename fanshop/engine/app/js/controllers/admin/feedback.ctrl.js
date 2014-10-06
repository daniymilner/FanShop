"use strict";

angular.module('shopApp').controller('adminFeedbackController',
	['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
	    $http({
	        method: 'GET',
	        url: '/api/feedback/getAllFeedback'
	    }).success(function (data) {
	        $scope.list = data;
	    });

	    $scope.delete = function (item) {
	        $http({
	            method: 'POST',
	            url: '/api/feedback/removeFeedback',
	            data: item
	        }).success(function () {
	            for (var i = 0; i < $scope.list.length; i++) {
	                if ($scope.list[i].Id == item.Id) {
	                    $scope.list.splice(i, 1);
	                    break;
	                }
	            }
	        });
	    };
	}]);