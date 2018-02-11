require('./main.scss');

export default function MainController($scope, NumberExpressionParser, PolishExpressionParser, ExpressionCalculateService) {
    let vm = $scope;

    vm.getNumberTree = ()=> vm.numberTree;

    vm.inputControl = {
        onProcess: (expression)=>{
            vm.numberTree = NumberExpressionParser.parse(expression);
        },
        onCalculateResult: (expression) => {
            return ExpressionCalculateService.calculate(PolishExpressionParser.parse(NumberExpressionParser.transformExpression(expression)));
        }
    }
}