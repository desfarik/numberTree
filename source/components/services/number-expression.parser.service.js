export default function NumberExpressionParser(TreeExpressionParser, PolishExpressionParser, ExpressionConstants) {

    this.parse = (expression) => {
        const parsedExpression = parseExpression(expression);
        console.log("PARSED", parsedExpression);
        const polishExpression = PolishExpressionParser.parse(parsedExpression);
        return TreeExpressionParser.parse(polishExpression);
    };

    function parseExpression(expression) {
        return expression.match(ExpressionConstants.PARSE_EXPRESSION);
    }
}
