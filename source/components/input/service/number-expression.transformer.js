export default function NumberExpressionTransformer(ExpressionConstants) {
    this.transform = (expression) => {
        return transformExpression(expression);
    };

    function transformExpression(expression) {
        let newExpression = deleteAllSpaces(expression);
        return wrapExpression(newExpression)
    }

    function deleteAllSpaces(expression) {
        return expression.replace(ExpressionConstants.SPACE, '');
    }

    function wrapExpression(expression) {
        return `(${expression})`
    }
}