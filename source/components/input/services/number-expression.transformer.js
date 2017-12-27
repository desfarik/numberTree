export default function NumberExpressionTransformer(ExpressionConstants) {
    this.transform = (expression) => {
        return transformExpression(expression);
    };

    function transformExpression(expression) {
        let newExpression = deleteAllSpaces(expression);
        return wrapExpression(newExpression)
    }

    function deleteAllSpaces(expression) {
        expression = deleteSpaceBefore(expression);
        return deleteSpaceAfter(expression);
    }

    function deleteSpaceBefore(expression) {
        return expression.replace(ExpressionConstants.SPACE_BEFORE, '');
    }

    function deleteSpaceAfter(expression) {
        _.forEach(expression.match(ExpressionConstants.SPACE_AFTER), (space) => {
            expression = expression.replace(space, space[0])
        });
        return expression;
    }

    function wrapExpression(expression) {
        return `(${expression})`
    }
}