"use strict";

angular.module('shopApp').controller('usersController',
	['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
	    var deleteUserFromList = function(id) {
	        for (var i = 0; i < $scope.usersList.length; i++) {
	            if ($scope.usersList[i].Id == id) {
	                $scope.usersList.splice(i, 1);
                    break;
	            }
	        }
	    };
	    $http({
	        method: 'GET',
	        url: '/api/user/getallusers'
	    }).success(function (data) {
	        $scope.usersList = data;
	    });

	    $scope.create = function () {
	        $rootScope.$state.go('adminUserActions');
	    };
	    $scope.edit = function (user) {
	        $rootScope.$state.go('adminUserActions', { userid: user.Id });
	    };
	    $scope.delete = function (user) {
	        $http({
	            method: 'POST',
	            url: '/api/user/deleteUser/' + user.Id
	        }).success(function () {
	            deleteUserFromList(user.Id);
	        });
	    };
	}]);