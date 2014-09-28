angular.module('shopApp')
	.factory('Auth', [
		'$rootScope', '$cookies', '$http', function ($rootScope, $cookies, $http) {
		    var cookieKey = '__vhe_u_olol';
		    var isAuth = false,
		        isAdmin = false;
		    return {
		        isAuthenticated: function () {
		            return isAuth;
		        },
		        isAdmin: function () {
		            return isAdmin;
		        },
		        authorize: function (data, callback) {
		            var login;
		            if (data) {
		                $cookies[cookieKey] = data.Login;
		                login = data.Login;
		            } else {
		                login = $cookies[cookieKey];
		            }
		            if (login) {
		                $http({
		                    method: 'GET',
		                    url: '/api/user/getuserinfo?login=' + login
		                }).success(function (dataInfo, status) {
		                    if (status === 200) {
		                        $rootScope.$user = dataInfo;
		                        isAuth = true;
		                        isAdmin = dataInfo.IsAdmin;
		                        if (callback) {
		                            callback(null, 200);
		                        }
		                        $rootScope.load = false;
		                    }
		                })
		                    .error(function (dataInfo, status) {
		                        if (callback) {
		                            callback(dataInfo, status);
		                        }
		                    });
		            } else {
		                $rootScope.load = false;
		            }
		        },
		        signUp: function (user, callback) {
		            var that = this;
		            $http({
		                method: "POST",
		                url: "/api/user/registration",
		                data: user
		            })
                    .success(function (registeredUser) {
                        that.authorize(registeredUser, callback);
                    })
                    .error(function (data, status) {
                        if (callback) {
                            callback(data, status);
                        }
                    });
		        },
		        signIn: function (userData, callback) {
		            var that = this;
		            $http({
		                method: "POST",
		                url: "/api/user/signIn",
		                data: userData
		            })
                    .success(function (user) {
                        that.authorize(user, callback);
                    })
                    .error(function (data, status) {
                        if (callback) {
                            callback(data, status);
                        }
                    });
		        },
		        signOut: function () {
		            isAuth = false;
		            isAdmin = false;
		            delete $cookies[cookieKey];
		            delete $rootScope.$user;
		            $rootScope.$state.go('home');
		        }
		    };
		}
	]).factory('myHttpInterceptor', function ($q) {
	    return function (promise) {
	        return promise.then(function (response) {
	            var app = document.getElementsByClassName('app-wrapper')[0];
	            app.classList.remove('none');
	            return response;

	        }, function (response) {
	            var app = document.getElementsByClassName('app-wrapper')[0];
	            app.classList.remove('none');
	            return $q.reject(response);
	        });
	    };
	});