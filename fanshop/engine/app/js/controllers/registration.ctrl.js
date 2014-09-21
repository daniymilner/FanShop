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
	        $rootScope.Auth.signUp($scope.user, function (data, status) {
	            if (!data && status == 200) {
	                $rootScope.$state.go('home');
	            }
	            else {
	                if (status == 412) {
	                    console.log(data);
	                    switch (data) {
	                        case 'login':
	                            break;
	                        case 'email':
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