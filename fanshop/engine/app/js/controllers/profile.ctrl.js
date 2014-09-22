"use strict";

angular.module('shopApp').controller('profileController',
	['$scope', '$rootScope', function ($scope, $rootScope) {
	    if (!$rootScope.$user)
	        $rootScope.$state.go('home');

	    $scope.user = {
	        login: 'Daniel',
	        email: 'alo@qapint.com'
	    };
	    
	}]);