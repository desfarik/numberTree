require('./main.scss');

export default function MainController($scope, NumberExpressionParser) {
    let vm = $scope;

    vm.loging = function () {
        console.log("dfsdf")
    };

    vm.getNumberTree = ()=> vm.numberTree;

    vm.inputControl = {
        onProcess: (expression)=>{
            vm.numberTree = NumberExpressionParser.parse(expression);
        }
    }
}