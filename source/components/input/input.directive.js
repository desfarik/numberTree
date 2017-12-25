import template from './input.html'
require('./input.scss');

export default function InputDirective() {
    return {
        restrict: 'E',
        template,
        link:function($scope) {
            $scope.numberExpression = '[\\-\\(\\)\\/\\+\\*\\d\\ ]+';
            $scope.inputNumber = '';

            $scope.processExpression = (expression) => {
                console.log(expression);
            }
        }
    };
};
