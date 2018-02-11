export default function ExpressionCalculateService(ExpressionConstants) {
    this.calculate = (expression)=> {
        return calculateExpression(expression);
    };

    function calculateExpression(expression) {
        while (expression.length > 1) {
            const operatorIndex = _.findIndex(expression, (element) => checkOperator(element));
            expression = calculate(expression, operatorIndex);
        }
        return expression[0];
    }

    function checkOperator(element) {
        return _.toString(element).match(ExpressionConstants.NO_NUMBERS);
    }

    function calculate(expression, operatorIndex) {
        if(isNaN(operatorIndex)){
            alert("expression is so big");
        }
        const value = operations[expression[operatorIndex]](_.toNumber(expression[operatorIndex - 2]), _.toNumber(expression[operatorIndex - 1]));
        return _.concat(expression.slice(0, operatorIndex - 2), value, expression.slice(operatorIndex + 1));
    }

    const operations = {
        "+": (x, y) => x + y,
        "-": (x, y) => x - y,
        "*": (x, y) => x * y,
        "/": (x, y) => x / y,
        "^": (x, y) => Math.pow(x, y),
    };
}