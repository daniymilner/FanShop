"use strict";

angular.module('shopApp').controller('loginController',
	['$scope', '$rootScope', function ($scope, $rootScope) {
	    $scope.user = {
	        login: '',
	        password: ''
	    };
	    $scope.signIn = function () {
	        $rootScope.Auth.signIn($scope.user, function (data, status) {
	            if (!data && status == 200) {
	                $rootScope.$state.go('home');
	            }
	            else {
	                if (status == 412) {
	                    console.log(data);
	                    switch (data) {
	                        case 'login':
	                            break;
	                        case 'password':
	                            break;
	                        default:
	                            break;
	                    }
	                }
	            }
	        });
	    };
	}]);