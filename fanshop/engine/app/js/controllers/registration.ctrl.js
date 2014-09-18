"use strict";

angular.module('shopApp').controller('registrationController',
	['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {
	    $scope.user = {
	        login: '',
	        email: '',
	        name: '',
	        surname: '',
	        password: '',
	        password_c: ''
	    };
	    $scope.register = function () {
	        console.log($scope.user);
	        $http({
	            method: "POST",
	            url: "/api/user/registration",
	            data: angular.copy($scope.user)
	        });
	        //.success(function () {
	        //    $rootScope.Auth.signIn($scope.user.login, $scope.user.password);
	        //    $rootScope.$state.go('home');
	        //})
	    };
	}]);