'use strict';

angular.module('shopApp', [
		'ui.router',
		'ngCookies',
        'UserValidation'
	]).run(
	['$rootScope', '$state', '$stateParams', 'Auth',
		function ($rootScope, $state, $stateParams, Auth) {
			Auth.authorize();
			$rootScope.Auth = Auth;
			$rootScope.$state = $state;
			$rootScope.$stateParams = $stateParams;
		}]);
