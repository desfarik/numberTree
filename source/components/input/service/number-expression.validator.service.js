export default function NumberExpressionValidator(NumberExpressionTransformer, ExpressionConstants) {

    this.isValid = (expression) => {
        this.expression = expression;
        const clearExpression = NumberExpressionTransformer.transform(expression);
        return verifyCountsBrackets(clearExpression) &&
            verifyNumbers(clearExpression) &&
            verifyLeftBrackets(clearExpression) &&
            verifyRightBrackets(clearExpression) &&
            verifySymbols(clearExpression);
    };

    function verifyCountsBrackets(expression) {
        return getSizeLeftBrackets(expression) === getSizeRightBrackets(expression);
    }

    function verifyLeftBrackets(expression) {
        return getSizeVerifiedLeftBrackets(expression) === getSizeLeftBrackets(expression);
    }

    function verifyRightBrackets(expression) {
        return getSizeVerifiedRightBrackets(expression) === getSizeRightBrackets(expression);
    }

    function getSizeVerifiedLeftBrackets(expression) {
        return _.size(expression.match(ExpressionConstants.VERIFY_LEFT_BRACKET)) + getDuplicateBrackets(expression, ExpressionConstants.DUPLICATE_LEFT_BRACKETS);
    }

    function getSizeVerifiedRightBrackets(expression) {
        return _.size(expression.match(ExpressionConstants.VERIFY_RIGHT_BRACKET)) + getDuplicateBrackets(expression, ExpressionConstants.DUPLICATE_RIGHT_BRACKETS);
    }

    function getDuplicateBrackets(expression, regex) {
        return _.size(expression.match(regex));
    }

    function verifyNumbers(expression) {
        return _.size(expression.match(ExpressionConstants.VERIFY_NUMBER)) === _.size(expression.match(ExpressionConstants.NUMBERS));
    }

    function verifySymbols(expression) {
        return _.size(expression.match(ExpressionConstants.VERIFY_SYMBOL)) === _.size(expression.match(ExpressionConstants.SYMBOLS));
    }

    function getSizeLeftBrackets(expression) {
        return _.size(expression.match(ExpressionConstants.LEFT_BRACKET))
    }

    function getSizeRightBrackets(expression) {
        return _.size(expression.match(ExpressionConstants.RIGHT_BRACKET))
    }
};