export default function NumberExpressionParser(TreeExpressionParser, PolishExpressionParser, ExpressionConstants) {

    this.parse = (expression) => {
        const parsedExpression = parseExpression(expression);
        console.log("PARSED", parsedExpression);
        const polishExpression = PolishExpressionParser.parse(parsedExpression);
        console.log("POLISH", polishExpression);
        return TreeExpressionParser.parse(polishExpression);
    };

    function parseExpression(expression) {
        expression = addSpaceBetweenBracketAndMinus(expression); //fixed situation with (-
        const parsedExpression = expression.match(ExpressionConstants.PARSE_EXPRESSION);
        return trimExpression(parsedExpression);
    }

    function addSpaceBetweenBracketAndMinus(expression) {
        return expression.replace(ExpressionConstants.PARSE_EXCEPTION_MINUS, '( -');
    }

    function trimExpression(expression) {
        return _.map(expression, (symbol) => _.trim(symbol));
    }
}
