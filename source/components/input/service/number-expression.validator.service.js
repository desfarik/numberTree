export default function NumberExpressionValidator() {

    const SPACE = /\s+/g;
    const LEFT_BRACKET = /\(/g;
    const RIGHT_BRACKET = /\)/g
    const VERIFY_LEFT_BRACKET = /\([\(\d]/g;
    const VERIFY_RIGHT_BRACKET = /\)[\)\-\/\+\*]|\)$/g;
    const DUPLICATE_LEFT_BRACKETS = /\({2}/g;
    const DUPLICATE_RIGHT_BRACKETS = /\){2}/g;
    const VERIFY_NUMBER = /\d+[\)\-\/\+\*]/g;
    const NUMBERS = /\d+/g;
    const SYMBOLS = /[\-\/\+\*]/g;
    const VERIFY_SYMBOL = /[\-\/\+\*][\d\(]/g;

    this.isValid = (expression) => {
        const clearExpression = transformExpression(expression);
        return verifyCountsBrackets(clearExpression) &&
            verifyNumbers(clearExpression) &&
            verifyLeftBrackets(clearExpression) &&
            verifyRightBrackets(clearExpression) &&
            verifySymbols(clearExpression);
    };

    function transformExpression(expression) {
        let newExpression = deleteAllSpaces(expression);
        return wrapExpression(newExpression)
    }

    function deleteAllSpaces(expression) {
        return expression.replace(SPACE, '');
    }

    function wrapExpression(expression) {
        return `(${expression})`
    }

    function verifyCountsBrackets(expression) {
        return _.size(expression.match(LEFT_BRACKET)) === _.size(expression.match(RIGHT_BRACKET));
    }

    function verifyLeftBrackets(expression) {
        return (_.size(expression.match(VERIFY_LEFT_BRACKET)) + getDuplicateBrackets(expression, DUPLICATE_LEFT_BRACKETS)) === _.size(expression.match(LEFT_BRACKET));
    }

    function verifyRightBrackets(expression) {
        return (_.size(expression.match(VERIFY_RIGHT_BRACKET)) + getDuplicateBrackets(expression, DUPLICATE_RIGHT_BRACKETS)) === _.size(expression.match(RIGHT_BRACKET));
    }

    function getDuplicateBrackets(expression, regex) {
        return _.size(expression.match(regex));
    }

    function verifyNumbers(expression) {
        return _.size(expression.match(VERIFY_NUMBER)) === _.size(expression.match(NUMBERS));
    }

    function verifySymbols(expression) {
        return _.size(expression.match(VERIFY_SYMBOL)) === _.size(expression.match(SYMBOLS));
    }
};