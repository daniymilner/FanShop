'use strict';

angular
	.module('shopApp').config(function ($stateProvider, $urlRouterProvider, $httpProvider, $compileProvider) {
	    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|data):/);
	    //$httpProvider.interceptors.push('shopAppHttp');
	    $urlRouterProvider.otherwise('/');

	    $stateProvider
			.state('home', {
			    url: '/',
			    title: 'Home',
			    views: {
			        login: {
			            templateUrl: 'app/views/login.html'
			        },
			        content: {
			            templateUrl: 'app/views/home.html'
			        }
			    },
                isSecure: false
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
			    },
			    isSecure: false
			})
			.state('foggotPassword', {
			    url: '/foggot',
			    title: 'Foggot password',
			    views: {
			        login: {
			            templateUrl: 'app/views/login.html'
			        },
			        content: {
			            templateUrl: 'app/views/foggotPassword.html'
			        }
			    },
			    isSecure: false
			})
			.state('products', {
			    url: '/products/:categoryKey',
			    title: 'Products',
			    views: {
			        content: {
			            templateUrl: 'app/views/products.html'
			        }
			    },
			    isSecure: false
			})
	        .state('contacts', {
	            url: '/contacts',
	            title: 'Contacts',
	            views: {
	                login: {
	                    templateUrl: 'app/views/login.html'
	                },
	                content: {
	                    templateUrl: 'app/views/contacts.html'
	                }
	            },
	            isSecure: false
	        })
	        .state('profile', {
	            url: '/profile',
	            title: 'Profile',
	            views: {
	                content: {
	                    templateUrl: 'app/views/profile.html'
	                }
	            },
	            isSecure: true
	        })
	        .state('category', {
	            url: '/category',
	            title: 'Category',
	            views: {
	                content: {
	                    templateUrl: 'app/views/category.html'
	                }
	            },
	            isSecure: true
	        })
	        .state('details', {
	            url: '/details/:productKey',
	            title: 'Details',
	            views: {
	                content: {
	                    templateUrl: 'app/views/details.html'
	                }
	            },
	            isSecure: true
	        });
	});
