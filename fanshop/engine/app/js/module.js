'use strict';

angular.module('shopApp', [
		'ui.router',
		'ngCookies',
        'UserValidation'
]).run(
	['$rootScope', '$state', '$stateParams', 'Auth',
		function ($rootScope, $state, $stateParams, Auth) {
		    $rootScope.load = true;
		    Auth.authorize();
		    $rootScope.Auth = Auth;
		    $rootScope.$state = $state;
		    $rootScope.$stateParams = $stateParams;
		    $rootScope.$on('$stateChangeStart', function (event, toState) {
		        //if ((toState.isSecure && !Auth.isAuthenticated()) || (toState.isAdmin && !Auth.isAdmin())) {
		        //    event.preventDefault();
		        //    $rootScope.$state.go('home');
		        //}
		    });
		}]);
