"use strict";

angular.module('shopApp').controller('detailsController',
	['$scope', '$rootScope', '$http', '$timeout', function ($scope, $rootScope, $http, $timeout) {
	    $scope.hide = false;
	    $http({
	        method: "POST",
	        url: "/api/product/getProductByPublicKey/" + $rootScope.$stateParams.productKey,
	    }).success(function (data) {
	        $scope.product = data;
	        $scope.product.count = 1;
	    }).error(function (data) {
	        if (data == 'no product') {
	            $scope.hide = true;
	        }
	    });

	    var timer;
	    $scope.addToBacket = function (toAdd) {
	        toAdd.disable = true;
	        toAdd.success = false;
	        $timeout.cancel(timer);
	        $http({
	            method: "POST",
	            url: "/api/basket/addProductToBasket",
	            data: {
	                user: $rootScope.$user,
	                product: toAdd
	            }
	        })
	        .success(function () {
	            toAdd.count = 1;
	            toAdd.success = true;
	            toAdd.disable = false;
	            timer = $timeout(function () {
	                toAdd.success = false;
	            }, 2000);
	        });
	    };
	}]);