"use strict";

angular.module('shopApp').controller('productsController',
	['$scope', '$rootScope', function ($scope, $rootScope) {
	    console.log($rootScope.$stateParams.categoryId);
	}]);