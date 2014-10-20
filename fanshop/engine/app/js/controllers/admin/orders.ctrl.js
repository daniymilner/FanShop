"use strict";

angular.module('shopApp').controller('adminOrdersController',
	['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
	    $http({
	        method: 'GET',
	        url: '/api/basket/getAllSuccessBaskets'
	    }).success(function (data) {
	        $scope.list = data;
	    });

	    $scope.edit = function(item) {
	        $rootScope.$state.go('adminOrdersEdit', { basketId: item.Basket.Id });
	    };

	    $scope.delete = function (item) {
	        $http({
	            method: 'POST',
	            url: '/api/basket/removeBasket',
                data: item.Basket
	        }).success(function () {
	            for (var i = 0; i < $scope.list.length; i++) {
	                if ($scope.list[i].Basket.Id == item.Basket.Id) {
	                    $scope.list.splice(i, 1);
                        break;
	                }
	            }
	        });
	    };

	    $scope.export = function () {
	        $http({
	            method: 'POST',
	            url: '/api/product/export'
	        }).success(function (data) {
	            console.log('success');
	        }).error(function () {
	            console.log('no orders to export');
	        });
	    };
	}]);