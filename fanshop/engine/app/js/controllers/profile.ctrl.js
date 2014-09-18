"use strict";

angular.module('shopApp').controller('profileController',
	['$scope', '$rootScope', function ($scope, $rootScope) {
	    $scope.user = {
	        login: 'Daniel',
	        email: 'alo@qapint.com'
	    };
	    
	}]);