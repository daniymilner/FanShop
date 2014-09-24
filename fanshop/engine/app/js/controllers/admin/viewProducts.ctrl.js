"use strict";

angular.module('shopApp').controller('viewProductsController',
	['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
	    $scope.create = function () {
	        $rootScope.$state.go('adminProductsActions');
	    };
	    $scope.edit = function (product) {
	        $rootScope.$state.go('adminProductsActions', { productId: product.Id });
	    };
	    $scope.delete = function (product) {
	        
	    };
	}]);