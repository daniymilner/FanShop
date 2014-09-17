angular.module('shopApp')
	.factory('Auth', [
		'$rootScope', '$cookies', '$http', function($rootScope, $cookies, $http){
			var cookieKey = '__vhe_u';
			return {
				authorize: function(data){
					var cookieUser;
					if(data){
						$rootScope.$user = data;
					}else{
						cookieUser = $cookies[cookieKey];
						if(cookieUser){
							$rootScope.$user = JSON.parse(cookieUser);
						}
					}
				},
				signIn: function(login, password){
					var that = this;
					$http({
						method: 'POST',
						url: '/sign-in',
						data: {
							login: login,
							password: password
						}
					})
						.success(function(data, status){
							if(status === 200){
								that.authorize(data);
							}
						});
				},
				signOut: function(){
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