export default function TreeExpressionParser(ExpressionConstants) {

    this.parse = (expression) => parseExpression(expression);

    function parseExpression(expression) {
        while (expression.length > 1) {
            const operatorIndex = _.findIndex(expression, (element) => checkOperator(element));
            expression = addBranchToExpression(expression, operatorIndex);
        }
        console.log("TREE", expression);
        return wrapTreeObject(expression);
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
        branch.fullValue = getBranchValue(branch);
        return branch;
    }

    function getBranchValue(branch) {
        let left = getValue(branch.left);
        let right = getValue(branch.right);
        return operations[branch.operand](_.toNumber(left), _.toNumber(right));
    }

    function getValue(branch) {
        return hasChild(branch) ? branch.expression.fullValue : branch.expression;
    }

    function hasChild(branch) {
        return branch.expression.left;
    }

    function wrapTreeObject(expression) {
        return {expression: expression[0]};
    }

    const operations = {
        "+": (x, y) => x + y,
        "-": (x, y) => x - y,
        "*": (x, y) => x * y,
        "/": (x, y) => x / y,
        "^": (x, y) => Math.pow(x, y),
    };
};