"use strict";

angular.module('shopApp').controller('historyDetailsController',
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
	        method: 'POST',
	        url: '/api/basket/basketInfoByPublicId/' + $rootScope.$stateParams.id
	    }).success(function (data) {
	        init(data);
	    });
	}]);