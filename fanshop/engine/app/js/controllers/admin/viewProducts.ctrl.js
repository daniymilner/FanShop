"use strict";

angular.module('shopApp').controller('viewProductsController',
	['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
	    var deleteProductFromList = function (id) {
	        for (var i = 0; i < $scope.productsList.length; i++) {
	            if ($scope.productsList[i].Id == id) {
	                $scope.productsList.splice(i, 1);
	                break;
	            }
	        }
	    },
	        getCategoryInfo = function (categoryId, callback) {
	            $http({
	                method: "POST",
	                url: "/api/category/getCategoryById/" + categoryId,
	            })
	            .success(function (data) {
	                callback(data);
	            });
	        };
	    $http({
	        method: 'GET',
	        url: '/api/product/getallproducts'
	    }).success(function (data) {
	        $scope.productsList = data;
	        $scope.productsList.forEach(function (item) {
	            getCategoryInfo(item.CategoryId, function (category) {
	                item.CategoryPublicKey = category.PublicKey;
	            });
	        });
	    });
	    $scope.create = function () {
	        $rootScope.$state.go('adminProductsActions');
	    };
	    $scope.edit = function (product) {
	        $rootScope.$state.go('adminProductsActions', { productId: product.Id });
	    };
	    $scope.delete = function (product) {
	        $http({
	            method: 'POST',
	            url: '/api/product/deleteProduct/' + product.Id
	        }).success(function () {
	            deleteProductFromList(product.Id);
	        });
	    };
	    $scope.import = function() {
	        console.log('import');
	    };
	}]);