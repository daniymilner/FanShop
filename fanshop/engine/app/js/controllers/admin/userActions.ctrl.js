"use strict";

angular.module('shopApp').controller('userActionsController',
	['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
	    $scope.hide = false;
	    if (!$rootScope.$stateParams.userid || $rootScope.$stateParams.userid === '') {
	        $scope.isCreate = true;
	        $scope.user = {
	            Id: 0,
	            Login: '',
	            Email: '',
	            Name: '',
	            Surname: '',
	            Password: '',
	            CreateDate: '',
	            IsAdmin: false
	        };
	    }
	    else {
	        $scope.isCreate = false;
	        $http({
	            method: "POST",
	            url: "/api/user/getUserById/" + $rootScope.$stateParams.userid,
	        })
	            .success(function (data) {
	                $scope.user = data;
	                $scope.user.CreateDate = new Date(parseInt($scope.user.CreateDate.replace('/Date(', '').replace(')/', ''))).toDateString();
	            })
	            .error(function (data) {
	                if (data == 'no user') {
	                    $scope.hide = true;
	                }
	            });
	    }

	    $scope.create = function () {
	        $http({
	            method: "POST",
	            url: "/api/user/registration",
	            data: $scope.user
	        })
	            .success(function () {
	                $rootScope.$state.go('adminUsers');
	            })
	            .error(function (data) {
	                switch (data) {
	                    case 'login':
	                        break;
	                    case 'email':
	                        break;
	                    default:
	                        break;
	                }
	            });
	    };

	    $scope.edit = function () {
	        $http({
	            method: "POST",
	            url: "/api/user/updateuser",
	            data: $scope.user
	        })
	            .success(function () {
	                $rootScope.$state.go('adminUsers');
	            });
	    };
	}]);