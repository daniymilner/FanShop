"use strict";

angular.module('shopApp').controller('productsController',
	['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
	    var build = function () {
	        $scope.viewList = [];
	        $scope.currentPage = 1;
	        $scope.numPerPage = 3;
	        $scope.countPages = Math.ceil($scope.list.length / $scope.numPerPage);

	        $scope.pages = [];
	        for (var i = 0 ; i < $scope.countPages; i++) {
	            $scope.pages.push(i + 1);
	        }

	        $scope.$watch('currentPage', function () {
	            var begin = (($scope.currentPage - 1) * $scope.numPerPage),
                    end = begin + $scope.numPerPage;

	            $scope.viewList = $scope.list.slice(begin, end);
	        });
	    };

	    $scope.hide = false;
	    $http({
	        method: "POST",
	        url: "/api/product/getProductsByCategoryKey/" + $rootScope.$stateParams.categoryKey,
	    })
	            .success(function (data) {
	                $scope.list = data;
	                build();
	            })
	            .error(function (data) {
	                if (data == 'no product') {
	                    $scope.hide = true;
	                }
	            });

	    $scope.goto = function (index) {
	        $scope.currentPage = index;
	    };

	    $scope.view = function (key) {
	        $rootScope.$state.go('details', { productKey: key });
	    };

	    $scope.goto(1);
	}]);