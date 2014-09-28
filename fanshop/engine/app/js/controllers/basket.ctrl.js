"use strict";

angular.module('shopApp').controller('basketController',
	['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
	    $scope.total = 0;
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
	        url: '/api/basket/getbasket?id=' + $rootScope.$user.Id
	    }).success(function (data) {
	        init(data);
	    }).error(function(data) {
	        
	    });

	    $scope.view = function (key) {
	        $rootScope.$state.go('details', { productKey: key });
	    };

	    $scope.remove = function (item) {
	        $http({
	            method: 'POST',
	            url: '/api/basket/removeProductFromBasket',
	            data: {
	                product: item,
	                user: $rootScope.$user
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

	    $scope.changeCount = function(item) {
	        $http({
	            method: 'POST',
	            url: '/api/basket/changeProductCountInBasket',
	            data: {
	                product: item,
	                user: $rootScope.$user
	            }
	        }).success(function (data) {
	            init(data);
	        });
	    };
	}]);