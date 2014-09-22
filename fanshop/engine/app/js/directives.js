angular.module('UserValidation', []).directive('validPasswordC', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function (viewValue) {
                var noMatch = viewValue != scope.registerForm.password.$viewValue;
                ctrl.$setValidity('noMatch', !noMatch);
            });
        }
    }
})