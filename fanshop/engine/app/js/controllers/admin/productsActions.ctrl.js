"use strict";

angular.module('shopApp').controller('productsActionsController',
	['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
	    var getAllCategories = function () {
	        $http({
	            method: 'GET',
	            url: '/api/category/getallcategories'
	        }).success(function (data) {
	            $scope.categoryList = data;
	            $scope.categoryList.forEach(function (item) {
	                if (item.Id == $scope.product.CategoryId) {
	                    $scope.activeCategory = item;
	                    return;
	                }
	            });
	            if (!$scope.activeCategory) {
	                $scope.activeCategory = $scope.categoryList[0];
	            }
	        });

	    };
	    $scope.hide = false;
	    if (!$rootScope.$stateParams.productId || $rootScope.$stateParams.productId === '') {
	        $scope.isCreate = true;
	        $scope.product = {
	            Id: 0,
	            Title: '',
	            Price: '',
	            Color: '',
	            Description: '',
	            UpdateDate: '',
	            CategoryId: '',
	            PublicKey: ''
	        };
	        getAllCategories();
	    }
	    else {
	        $scope.isCreate = false;
	        $http({
	            method: "POST",
	            url: "/api/product/getProductById/" + $rootScope.$stateParams.productId,
	        })
	            .success(function (data) {
	                $scope.product = data;
	                $scope.product.UpdateDate = new Date(parseInt($scope.product.UpdateDate.replace('/Date(', '').replace(')/', ''))).toDateString();
	                getAllCategories();
	            })
	            .error(function (data) {
	                if (data == 'no product') {
	                    $scope.hide = true;
	                }
	            });
	    }

	    $scope.create = function () {
	        $http({
	            method: "POST",
	            url: "/api/product/createProduct",
	            data: $scope.product
	        })
	            .success(function () {
	                $rootScope.$state.go('adminProducts');
	            })
	            .error(function (data) {
	                switch (data) {
	                    case 'key':
	                        break;
	                    default:
	                        break;
	                }
	            });
	    };

	    $scope.edit = function () {
	        $http({
	            method: "POST",
	            url: "/api/product/updateProduct",
	            data: $scope.product
	        })
               .success(function () {
                   $rootScope.$state.go('adminProducts');
               });
	    };

	    $scope.changeCategory = function () {
	        $scope.product.CategoryId = $scope.activeCategory.Id;
	    };
	}]);