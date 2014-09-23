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
			        content: {
			            templateUrl: 'app/views/home.html'
			        },
			        menu: {
			            templateUrl: 'app/views/menu.html'
			        }
			    },
                isSecure: false
			})
			.state('registration', {
			    url: '/registration',
			    title: 'Registration',
			    views: {
			        content: {
			            templateUrl: 'app/views/registration.html'
			        },
			        menu: {
			            templateUrl: 'app/views/menu.html'
			        }
			    },
			    isSecure: false
			})
			.state('foggotPassword', {
			    url: '/foggot',
			    title: 'Foggot password',
			    views: {
			        content: {
			            templateUrl: 'app/views/foggotPassword.html'
			        },
			        menu: {
			            templateUrl: 'app/views/menu.html'
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
			        },
			        menu: {
			            templateUrl: 'app/views/menu.html'
			        }
			    },
			    isSecure: false
			})
	        .state('contacts', {
	            url: '/contacts',
	            title: 'Contacts',
	            views: {
	                content: {
	                    templateUrl: 'app/views/contacts.html'
	                },
	                menu: {
	                    templateUrl: 'app/views/menu.html'
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
	                },
	                menu: {
	                    templateUrl: 'app/views/menu.html'
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
	                },
	                menu: {
	                    templateUrl: 'app/views/menu.html'
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
	                },
	                menu: {
	                    templateUrl: 'app/views/menu.html'
	                }
	            },
	            isSecure: true
	        })
	        .state('admin', {
	            url: '/admin',
	            title: 'Admin',
	            views: {
	                content: {
	                    templateUrl: 'app/views/admin/index.html'
	                },
	                menu: {
	                    templateUrl: 'app/views/admin/menu.html'
	                }
	            },
	            isSecure: true,
                isAdmin: true
	        })
	        .state('adminUsers', {
	            url: '/admin/users',
	            title: 'Admin Users',
	            views: {
	                content: {
	                    templateUrl: 'app/views/admin/users.html'
	                },
	                menu: {
	                    templateUrl: 'app/views/admin/menu.html'
	                }
	            },
	            isSecure: true,
	            isAdmin: true
	        })
	        .state('adminUserActions', {
	            url: '/admin/users/actions/:userid',
	            title: 'Admin User Actions',
	            views: {
	                content: {
	                    templateUrl: 'app/views/admin/userActions.html'
	                },
	                menu: {
	                    templateUrl: 'app/views/admin/menu.html'
	                }
	            },
	            isSecure: true,
	            isAdmin: true
	        })
	        .state('adminCategory', {
	            url: '/admin/category',
	            title: 'Admin Category',
	            views: {
	                content: {
	                    templateUrl: 'app/views/admin/category.html'
	                },
	                menu: {
	                    templateUrl: 'app/views/admin/menu.html'
	                }
	            },
	            isSecure: true,
	            isAdmin: true
	        })
	        .state('adminCategoryActions', {
	            url: '/admin/category/actions/:id',
	            title: 'Admin Category Actions',
	            views: {
	                content: {
	                    templateUrl: 'app/views/admin/categoryActions.html'
	                },
	                menu: {
	                    templateUrl: 'app/views/admin/menu.html'
	                }
	            },
	            isSecure: true,
	            isAdmin: true
	        });
	});
