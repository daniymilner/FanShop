"use strict";

angular.module('shopApp').controller('categoryActionsController',
	['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
	    $scope.hide = false;
	    if (!$rootScope.$stateParams.id || $rootScope.$stateParams.id === '') {
	        $scope.isCreate = true;
	        $scope.category = {
	            Id: 0,
	            Name: '',
	            PublicKey: ''
	        };
	    }
	    else {
	        $scope.isCreate = false;
	        $http({
	            method: "POST",
	            url: "/api/category/getCategoryById/" + $rootScope.$stateParams.id,
	        })
	            .success(function (data) {
	                $scope.category = data;
	            })
	            .error(function (data) {
	                if (data == 'no category') {
	                    $scope.hide = true;
	                }
	            });
	    }

	    $scope.create = function () {
	        $http({
	            method: "POST",
	            url: "/api/category/createCategory",
	            data: $scope.category
	        })
	            .success(function () {
	                $rootScope.$state.go('adminCategory');
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
	            url: "/api/category/updateCategory",
	            data: $scope.category
	        })
	            .success(function () {
	                $rootScope.$state.go('adminCategory');
	            });
	    };
	}]);