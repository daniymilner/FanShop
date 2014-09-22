angular.module('shopApp')
	.factory('Auth', [
		'$rootScope', '$cookies', '$http', function ($rootScope, $cookies, $http) {
		    var cookieKey = '__vhe_u_olol';
		    return {
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
		                        if (callback) {
		                            callback(null, 200);
		                        }
		                    }
		                })
                        .error(function (dataInfo, status) {
                            if (callback) {
                                callback(dataInfo, status);
                            }
                        });
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
                signIn: function(userData, callback) {
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
		            delete $cookies[cookieKey];
		            delete $rootScope.$user;
		            $rootScope.$state.go('home');
		        }
		    };
		}
	]);
//.factory('shopAppHttp', function($q, $rootScope){
//	return {
//		responseError: function(response){
//			if($rootScope.$state.current.isSecure){
//				if($rootScope.$state.current.name !== 'login'){
//					$rootScope.Auth.signOut();
//					$rootScope.$state.go('login');
//				}
//				return response;
//			}else{
//			}
//
//			return $q.reject(response);
//		}
//	};
//});