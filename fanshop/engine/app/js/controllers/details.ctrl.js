"use strict";

angular.module('shopApp').controller('detailsController',
	['$scope', '$rootScope', function ($scope, $rootScope) {
		console.log($rootScope.$stateParams.productKey);

		$scope.product = {
			id: 1,
			title: 'Nike',
			price: 10.5,
			color: 'white',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut scelerisque nisi, quis sollicitudin orci. Phasellus consectetur elementum faucibus. Sed ut arcu quis enim convallis accumsan at a elit. Praesent quam tellus, placerat sed eros quis, venenatis lobortis risus. Sed laoreet faucibus eros, at venenatis tortor aliquam sed. Quisque a tellus eu dolor varius imperdiet. Maecenas varius vestibulum sem, eget aliquam nisl blandit a. In condimentum, nibh non egestas maximus, elit odio congue libero, in fringilla mauris odio nec orci. Quisque vel aliquet nisl, quis sagittis neque. Nunc tortor sem, pretium id dui non, varius bibendum neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut scelerisque nisi, quis sollicitudin orci. Phasellus consectetur elementum faucibus. Sed ut arcu quis enim convallis accumsan at a elit. Praesent quam tellus, placerat sed eros quis, venenatis lobortis risus. Sed laoreet faucibus eros, at venenatis tortor aliquam sed. Quisque a tellus eu dolor varius imperdiet. Maecenas varius vestibulum sem, eget aliquam nisl blandit a. In condimentum, nibh non egestas maximus, elit odio congue libero, in fringilla mauris odio nec orci. Quisque vel aliquet nisl, quis sagittis neque. Nunc tortor sem, pretium id dui non, varius bibendum neque. ',
			key: 'nike_1'
		}
	}]);