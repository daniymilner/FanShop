"use strict";

angular.module('shopApp').controller('adminCategoryController',
	['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
	    $scope.categoryList = [{
	        Id: 1,
	        Name: 'Boots',
	        PublicKey: 'boots'
	    }, {
	        Id: 2,
	        Name: 'Shorts',
	        PublicKey: 'shorts'
	    }, {
	        Id: 3,
	        Name: 'T-Shorts',
	        PublicKey: 'tshorts'
	    }];

	    $scope.create = function () {
	        $rootScope.$state.go('adminCategoryActions');
	    };
	    $scope.edit = function (category) {
	        $rootScope.$state.go('adminCategoryActions', { id: category.Id });
	    };
	    $scope.delete = function (user) {
	       
	    };
	}]);