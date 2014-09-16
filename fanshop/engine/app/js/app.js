'use strict';

angular
	.module('shopApp').config(function($stateProvider, $urlRouterProvider, $httpProvider, $compileProvider){
		$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|data):/);
		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('home', {
				url:'/',
				title: 'home',
				views:{
					content:{
						templateUrl:'app/views/home.html'
					}
				}
			});
	});
