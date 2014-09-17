'use strict';

angular
	.module('shopApp').config(function($stateProvider, $urlRouterProvider, $httpProvider, $compileProvider){
		$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|data):/);
		//$httpProvider.interceptors.push('shopAppHttp');
		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('home', {
				url:'/',
				title: 'home',
				views:{
					login: {
						templateUrl: 'app/views/login.html'
					},
					content:{
						templateUrl:'app/views/home.html'
					}
				}
			})
			.state('registration', {
				url: '/registration',
				title: 'Registration',
				views: {
					login: {
						templateUrl: 'app/views/login.html'
					},
					content: {
						templateUrl: 'app/views/registration.html'
					}
				}
			})
			.state('products', {
				url:'/products',
				title: 'products',
				views: {
				    login: {
				        templateUrl: 'app/views/login.html'
				    },
					content:{
						templateUrl:'app/views/products.html'
					}
				}
			});
	});
