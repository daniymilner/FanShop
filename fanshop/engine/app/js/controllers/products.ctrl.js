"use strict";

angular.module('shopApp').controller('productsController',
	['$scope', '$rootScope', function ($scope, $rootScope) {
	    console.log($rootScope.$stateParams.categoryKey);

	    $scope.list = [{
	        id: 1,
	        title: 'Nike',
	        price: 10.5,
	        color: 'white',
	        description: 'Good ball',
	        key: 'nike_1'
	    }, {
	        id: 2,
	        title: 'Nike Yellow',
	        price: 12.5,
	        color: 'Yellow',
	        description: 'Good ball',
	        key: 'nike_2'
	    }, {
	        id: 3,
	        title: 'Adidas',
	        price: 7.5,
	        color: 'white',
	        description: 'Good ball',
	        key: 'nike_3'
	    }, {
	        id: 4,
	        title: 'Nike Red',
	        price: 10.5,
	        color: 'Red',
	        description: 'Good ball',
	        key: 'nike_4'
	    }, {
	        id: 5,
	        title: 'Nike Best',
	        price: 10.5,
	        color: 'Blue',
	        description: 'Good ball',
	        key: 'nike_5'
	    }];

	    $scope.viewList = [];
	    $scope.currentPage = 1;
	    $scope.numPerPage = 3;
	    $scope.countPages = Math.ceil($scope.list.length / $scope.numPerPage);

	    $scope.pages = [];
	    for (var i = 0 ; i < $scope.countPages; i++) {
	        $scope.pages.push(i + 1);
	    }

	    $scope.goto = function (index) {
	        $scope.currentPage = index;
	    };

	    $scope.$watch('currentPage', function () {
	        var begin = (($scope.currentPage - 1) * $scope.numPerPage),
	            end = begin + $scope.numPerPage;

	        $scope.viewList = $scope.list.slice(begin, end);
	    });

	    $scope.view = function (key) {
	        $rootScope.$state.go('details', { productKey: key});
	    };

	    $scope.goto(1);
	}]);