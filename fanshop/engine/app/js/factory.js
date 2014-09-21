angular.module('shopApp')
	.factory('Auth', [
		'$rootScope', '$cookies', '$http', function ($rootScope, $cookies, $http) {
		    var cookieKey = '__vhe_u_olol';
		    return {
		        authorize: function (data, callback) {
		            var login;
		            if (data) {
		                $rootScope.Auth.setCookie(cookieKey, data.Login, 30);
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
		        },
		        setCookie: function (cname, cvalue, exdays) {
		            var d = new Date();
		            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
		            var expires = "expires=" + d.toUTCString();
		            document.cookie = cname + "=" + cvalue + "; " + expires;
		        },
		        getCookie: function (cname) {
		            var name = cname + "=";
		            var ca = document.cookie.split(';');
		            for (var i = 0; i < ca.length; i++) {
		                var c = ca[i];
		                while (c.charAt(0) == ' ') c = c.substring(1);
		                if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
		            }
		            return "";
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