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
            $scope.inputNumber = '';
            $scope.result = null;

            $scope.verifyExpression = (form) => {
                if (!NumberExpressionValidator.isValidExpressionForPattern(form.$viewValue)) {
                    form.$setValidity('customErrorPattern', false);
                } else {
                    form.$setValidity('customErrorPattern', true);
                    if (NumberExpressionValidator.isValidExpression(form.$viewValue)) {
                        form.$setValidity('customErrorNumberExpression', true);
                        $scope.result = $scope.inputControl.onCalculateResult($scope.inputNumber);
                        $scope.inputControl.onProcess(NumberExpressionTransformer.transform($scope.inputNumber));
                    } else {
                        form.$setValidity('customErrorNumberExpression', false);
                    }

                }
            };

            $scope.getResult = (expression) => {
                return expression + (!!$scope.result ? ` = ${$scope.result}` : '');
            };

            $scope.getTransformerText = (text) => text ? NumberExpressionTransformer.transform(text) : '';
        }
    };
};
