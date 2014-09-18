"use strict";

angular.module('shopApp').controller('categoryController',
	['$scope', '$rootScope', function ($scope, $rootScope) {
	    $scope.list = [{
	        id: 1,
	        name: 'Мячи',
	        key: 'ball'
	    }, {
	        id: 2,
	        name: 'Бутси',
	        key: 'shoes'
	    }, {
	        id: 3,
	        name: 'Шарфи',
	        key: 'scarves'
	    }, {
	        id: 4,
	        name: 'Мячи',
	        key: 'ball'
	    }, {
	        id: 5,
	        name: 'Бутси',
	        key: 'shoes'
	    }, {
	        id: 6,
	        name: 'Шарфи',
	        key: 'scarves'
	    }];

	    $scope.goto = function (categoryId) {
	        $rootScope.$state.go('products', { categoryId: categoryId });
	    };
	}]);