'use strict';

angular
	.module('shopApp').config(function ($stateProvider, $urlRouterProvider, $httpProvider, $compileProvider) {
	    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|data):/);
	    $urlRouterProvider.otherwise('/');
	    $httpProvider.responseInterceptors.push('myHttpInterceptor');
	    var spinnerFunction = function (data) {
	        var app = document.getElementsByClassName('app-wrapper')[0];
	        app.classList.add('none');
	        return data;
	    };
	    $httpProvider.defaults.transformRequest.push(spinnerFunction);

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
            .state('basket', {
                url: '/basket',
                title: 'Basket',
                views: {
                    content: {
                        templateUrl: 'app/views/basket.html'
                    },
                    menu: {
                        templateUrl: 'app/views/menu.html'
                    }
                },
                isSecure: true
            })
            .state('history', {
                url: '/history',
                title: 'History',
                views: {
                    content: {
                        templateUrl: 'app/views/history.html'
                    },
                    menu: {
                        templateUrl: 'app/views/menu.html'
                    }
                },
                isSecure: true
            })
            .state('historyDetails', {
                url: '/history/details/:id',
                title: 'History Details',
                views: {
                    content: {
                        templateUrl: 'app/views/historyDetails.html'
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
	        })
	        .state('adminProducts', {
	            url: '/admin/products',
	            title: 'Admin Products',
	            views: {
	                content: {
	                    templateUrl: 'app/views/admin/products.html'
	                },
	                menu: {
	                    templateUrl: 'app/views/admin/menu.html'
	                }
	            },
	            isSecure: true,
	            isAdmin: true
	        })
	        .state('adminProductsActions', {
	            url: '/admin/products/actions/:productId',
	            title: 'Admin Products Actions',
	            views: {
	                content: {
	                    templateUrl: 'app/views/admin/productsActions.html'
	                },
	                menu: {
	                    templateUrl: 'app/views/admin/menu.html'
	                }
	            },
	            isSecure: true,
	            isAdmin: true
	        })
	        .state('adminOrders', {
	            url: '/admin/orders',
	            title: 'Admin Orders',
	            views: {
	                content: {
	                    templateUrl: 'app/views/admin/orders.html'
	                },
	                menu: {
	                    templateUrl: 'app/views/admin/menu.html'
	                }
	            },
	            isSecure: true,
	            isAdmin: true
	        })
	        .state('adminOrdersEdit', {
	            url: '/admin/orders/edit/:basketId',
	            title: 'Admin Orders Edit',
	            views: {
	                content: {
	                    templateUrl: 'app/views/admin/ordersEdit.html'
	                },
	                menu: {
	                    templateUrl: 'app/views/admin/menu.html'
	                }
	            },
	            isSecure: true,
	            isAdmin: true
	        })
	        .state('adminFeedback', {
	            url: '/admin/feedback',
	            title: 'Admin Feedback',
	            views: {
	                content: {
	                    templateUrl: 'app/views/admin/feedback.html'
	                },
	                menu: {
	                    templateUrl: 'app/views/admin/menu.html'
	                }
	            },
	            isSecure: true,
	            isAdmin: true
	        });
	});
