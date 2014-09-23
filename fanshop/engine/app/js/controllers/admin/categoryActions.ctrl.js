"use strict";

angular.module('shopApp').controller('categoryActionsController',
	['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
	    if ($rootScope.$stateParams.id === '') {
	        $scope.isCreate = true;
	        $scope.category = {
	            Id: 0,
	            Name: '',
	            PublicKey: ''
	        };
	    }
	    else {
	        $scope.isCreate = false;
	        $scope.category = {
	            Id: 1,
	            Name: 'Boots',
	            PublicKey: 'boots'
	        };
	    }

	    $scope.create = function () { };
	    $scope.edit = function () { };
	}]); 