require('./main.scss');

export default function MainController($scope, NumberExpressionParser) {
    let vm = $scope;

    vm.loging = function () {
        console.log("dfsdf")
    };

    vm.inputControl = {
        onProcess: (expression)=>{
            vm.parsedExpression = NumberExpressionParser.parse(expression)
        }
    }
}