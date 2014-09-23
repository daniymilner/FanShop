"use strict";

angular.module('shopApp').controller('userActionsController',
	['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
	    if ($rootScope.$stateParams.userid === '') {
	        $scope.isCreate = true;
	        $scope.user = {
	            Id: 0,
	            Login: '',
	            Email: '',
	            Name: '',
	            Surname: '',
	            CreateDate: '',
	            IsAdmin: false
	        };
	    }
	    else {
	        $scope.isCreate = false;
	        $scope.user = {
	            Id: 1,
	            Login: 'Ololosh',
	            Email: 'alo@qapint.com',
	            Name: 'Ololoshovvvv',
	            Surname: 'Ololoshev',
	            CreateDate: 'a',
	            IsAdmin: true
	        };
	    }
	    
	    $scope.create = function () { };
	    $scope.edit = function () { };
	}]);