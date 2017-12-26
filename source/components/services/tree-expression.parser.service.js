export default function TreeExpressionParser(ExpressionConstants) {

    this.parse = (expression) => parseExpression(expression);

    function parseExpression(expression) {
        while (expression.length > 1) {
            const operatorIndex = _.findIndex(expression, (element) => checkOperator(element));
            expression = addBranchToExpression(expression, operatorIndex);
        }
        console.log("TREE",expression);
        return expression;
    }

    function checkOperator(element) {
        return isNotBranch(element) && element.match(ExpressionConstants.NO_NUMBERS);
    }

    function isNotBranch(element) {
        return !_.isObjectLike(element);
    }

    function addBranchToExpression(expression, operatorIndex) {
        const branch = createBranch(expression[operatorIndex - 2], expression[operatorIndex - 1], expression[operatorIndex]);
        return _.concat(expression.slice(0, operatorIndex - 2), branch, expression.slice(operatorIndex + 1));
    }

    function createBranch(left, right, operand) {
        let branch = {};
        branch.left = {expression: left};
        branch.right = {expression: right};
        branch.operand = operand;
        //branch.value = operations[operand](_.toNumber(left))(_.toNumber(right));
        return branch;
    }

    const operations = {
        "+": (x, y) => x + y,
        "-": (x, y) => x - y,
        "*": (x, y) => x * y,
        "/": (x, y) => x / y,
        "^": (x, y) => Math.pow(x, y),
    };
};