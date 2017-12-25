import template from './input.html'
require('./input.scss');

const DEFAULT_ERRORS = ['pattern'];

export default function InputDirective(NumberExpressionValidator) {
    return {
        restrict: 'E',
        template,
        link:function($scope) {
            $scope.numberExpression = '[\\-\\(\\)\\/\\+\\*\\d\\ ]+';
            $scope.inputNumber = '';

            $scope.verifyExpression = (form) => {
                if(!_.includes(form.$error,DEFAULT_ERRORS)) {
                    form.$setValidity('customErrorNumberExpression',NumberExpressionValidator.isValid(form.$viewValue));
                }
            };

            $scope.processExpression = (expression, form) => {
                console.log(form);

            }
        }
    };
};
