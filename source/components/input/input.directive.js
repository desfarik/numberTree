import template from './input.html'

require('./input.scss');

const DEFAULT_ERRORS = ['pattern'];

export default function InputDirective(NumberExpressionValidator, NumberExpressionTransformer) {
    return {
        restrict: 'E',
        template,
        scope: {
            inputControl: '='
        },
        link: function ($scope) {
            $scope.numberExpression = '[\\-\\(\\)\\/\\+\\*\\d\\ ]+';
            $scope.inputNumber = '(2+3)-2/5';

            $scope.verifyExpression = (form) => {
                if (!_.includes(form.$error, DEFAULT_ERRORS)) {
                    form.$setValidity('customErrorNumberExpression', NumberExpressionValidator.isValid(form.$viewValue));
                }
            };

            $scope.processExpression = (expression) => {
                $scope.inputControl.onProcess(NumberExpressionTransformer.transform(expression));
            };
            $scope.getTransformerText = (text) => text ? NumberExpressionTransformer.transform(text) : '';
        }
    };
};
