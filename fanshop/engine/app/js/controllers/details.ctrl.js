"use strict";

angular.module('shopApp').controller('detailsController',
	['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
	    $scope.hide = false;
	    $http({
	        method: "POST",
	        url: "/api/product/getProductByPublicKey/" + $rootScope.$stateParams.productKey,
	    })
	            .success(function (data) {
	                $scope.product = data;
	            })
	            .error(function (data) {
	                if (data == 'no product') {
	                    $scope.hide = true;
	                }
	            });
	}]);