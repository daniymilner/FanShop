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
			    }
			})
			.state('products', {
			    url: '/products/:categoryId',
			    title: 'Products',
			    views: {
			        login: {
			            templateUrl: 'app/views/login.html'
			        },
			        content: {
			            templateUrl: 'app/views/products.html'
			        }
			    }
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
	            }
	        })
	        .state('profile', {
	            url: '/profile',
	            title: 'Profile',
	            views: {
	                login: {
	                    templateUrl: 'app/views/login.html'
	                },
	                content: {
	                    templateUrl: 'app/views/profile.html'
	                }
	            }
	        })
	        .state('category', {
	            url: '/category',
	            title: 'Category',
	            views: {
	                login: {
	                    templateUrl: 'app/views/login.html'
	                },
	                content: {
	                    templateUrl: 'app/views/category.html'
	                }
	            }
	        });
	});
