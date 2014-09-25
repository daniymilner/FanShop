"use strict";

angular.module('shopApp').controller('categoryController',
	['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
	    $http({
	        method: 'GET',
	        url: '/api/category/getallcategories'
	    }).success(function (data) {
	        $scope.list = data;
	    });

	    $scope.goto = function (categoryKey) {
	        $rootScope.$state.go('products', { categoryKey: categoryKey });
	    };
	}]);