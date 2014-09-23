"use strict";

angular.module('shopApp').controller('usersController',
	['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
	    $scope.usersList = [{
	        Id: 1,
	        Login: 'Ololosh',
	        Email: 'alo@qapint.com',
	        Name: 'Ololoshovvvv',
	        Surname: 'Ololoshev',
	        CreateDate: 'a',
	        IsAdmin: true
	    }, {
	        Id: 2,
	        Login: 'ASDasd',
	        Email: 'asd@asd.com',
	        Name: 'Asd',
	        Surname: 'SDFGG',
	        CreateDate: 'a',
	        IsAdmin: false
	    }, {
	        Id: 3,
	        Login: 'Test',
	        Email: 'test@test.com',
	        Name: 'Test',
	        Surname: 'Test',
	        CreateDate: 'a',
	        IsAdmin: false
	    }];

	    $scope.create = function () {
	        $rootScope.$state.go('adminUserActions');
	    };
	    $scope.edit = function (user) {
	        $rootScope.$state.go('adminUserActions', { userid: user.Id });
	    };
	    $scope.delete = function (user) {
	        //$http({
	        //    method: 'POST',
	        //    url: '/api/user/deleteuserbyid',
	        //    data: {
	        //        id: user.Id
	        //    }
	        //}).success(function (data, status) {
	        //}).error(function (data, status) {
	        //});
	    };
	}]);