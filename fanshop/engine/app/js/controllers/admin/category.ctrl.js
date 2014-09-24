"use strict";

angular.module('shopApp').controller('adminCategoryController',
	['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
	    var deleteCategoryFromList = function (id) {
	        for (var i = 0; i < $scope.categoryList.length; i++) {
	            if ($scope.categoryList[i].Id == id) {
	                $scope.categoryList.splice(i, 1);
	                break;
	            }
	        }
	    };
	    $http({
	        method: 'GET',
	        url: '/api/category/getallcategories'
	    }).success(function (data) {
	        $scope.categoryList = data;
	    });

	    $scope.create = function () {
	        $rootScope.$state.go('adminCategoryActions');
	    };
	    $scope.edit = function (category) {
	        $rootScope.$state.go('adminCategoryActions', { id: category.Id });
	    };
	    $scope.delete = function (category) {
	        $http({
	            method: 'POST',
	            url: '/api/category/deleteCategory/' + category.Id
	        }).success(function () {
	            deleteCategoryFromList(category.Id);
	        });
	    };
	}]);