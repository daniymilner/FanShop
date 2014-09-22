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
	        name: 'Футболки',
	        key: 'tshirt'
	    }, {
	        id: 5,
	        name: 'Шорты',
	        key: 'shirt'
	    }];

	    $scope.goto = function (categoryKey) {
	        $rootScope.$state.go('products', { categoryKey: categoryKey });
	    };
	}]);