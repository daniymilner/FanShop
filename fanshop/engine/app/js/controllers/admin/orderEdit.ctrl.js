"use strict";

angular.module('shopApp').controller('adminOrdersEditController',
	['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
	    $scope.total = 0;
	    $scope.viewList = [];
	    var init = function (data) {
	        $scope.viewList = [];
	        $scope.data = data;
	        $scope.data.Lines.forEach(function (item) {
	            var product = item.Product;
	            product.Count = item.Line.Count;
	            $scope.viewList.push(product);
	        });
	        $scope.total = $scope.data.Basket.Total;
	    };
	    $http({
	        method: 'GET',
	        url: '/api/basket/getBasketInfoById/' + $rootScope.$stateParams.basketId
	    }).success(function (data) {
	        init(data);
	    });

	    $scope.view = function (key) {
	        $rootScope.$state.go('details', { productKey: key });
	    };

	    $scope.remove = function (item) {
	        $http({
	            method: 'POST',
	            url: '/api/basket/removeProductFromBasketById',
	            data: {
	                product: item,
	                basketId: $rootScope.$stateParams.basketId
	            }
	        }).success(function (data) {
	            for (var i = 0; i < $scope.data.Lines.length; i++) {
	                if ($scope.data.Lines[i].Product.Id == item.Id) {
	                    $scope.data.Lines.splice(i, 1);
	                    $scope.viewList.splice(i, 1);
	                    $scope.total = $scope.total - item.Price * item.Count;
	                    break;
	                }
	            }
	        });
	    };

	    $scope.changeCount = function (item) {
	        $http({
	            method: 'POST',
	            url: '/api/basket/changeProductCountInBasketById',
	            data: {
	                product: item,
	                basketId: $rootScope.$stateParams.basketId
	            }
	        }).success(function (data) {
	            init(data);
	        });
	    };
	}]);