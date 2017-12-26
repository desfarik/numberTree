export default function NumberExpressionValidator(NumberExpressionTransformer, ExpressionConstants) {

    this.isValid = (expression) => {
        const clearExpression = NumberExpressionTransformer.transform(expression);
/*        console.log("------------");
        console.log('verifyCountsBrackets',verifyCountsBrackets(clearExpression));
        console.log('verifyNumbers',verifyNumbers(clearExpression));
        console.log('verifyLeftBrackets',verifyLeftBrackets(clearExpression));
        console.log('verifyRightBrackets',verifyRightBrackets(clearExpression));
        console.log('verifyOperators',verifyOperators(clearExpression));*/
        return verifyCountsBrackets(clearExpression)
            && verifyNumbers(clearExpression)
            && verifyLeftBrackets(clearExpression)
            && verifyRightBrackets(clearExpression)
            && verifyOperators(clearExpression);
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
        return _.size(expression.match(ExpressionConstants.VERIFY_LEFT_BRACKETS)) + getDuplicateBrackets(expression, ExpressionConstants.DUPLICATE_LEFT_BRACKETS);
    }

    function getSizeVerifiedRightBrackets(expression) {
        return _.size(expression.match(ExpressionConstants.VERIFY_RIGHT_BRACKETS)) + getDuplicateBrackets(expression, ExpressionConstants.DUPLICATE_RIGHT_BRACKETS);
    }

    function getDuplicateBrackets(expression, regex) {
        return _.size(expression.match(regex));
    }

    function verifyNumbers(expression) {
        return _.size(expression.match(ExpressionConstants.VERIFY_NUMBERS)) === _.size(expression.match(ExpressionConstants.NUMBERS));
    }

    function verifyOperators(expression) {
        return _.size(expression.match(ExpressionConstants.VERIFY_OPERATORS)) === _.size(expression.match(ExpressionConstants.OPERATORS));
    }

    function getSizeLeftBrackets(expression) {
        return _.size(expression.match(ExpressionConstants.LEFT_BRACKETS))
    }

    function getSizeRightBrackets(expression) {
        return _.size(expression.match(ExpressionConstants.RIGHT_BRACKETS))
    }
};