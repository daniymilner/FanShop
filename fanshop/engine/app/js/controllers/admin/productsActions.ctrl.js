"use strict";

angular.module('shopApp').controller('productsActionsController',
	['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
	    if ($rootScope.$stateParams.productId === '') {
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
	    }
	    else {
	        $scope.isCreate = false;
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
	    }

	    $scope.create = function () { };
	    $scope.edit = function () { };
	}]);