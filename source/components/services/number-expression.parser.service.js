export default function NumberExpressionParser(TreeExpressionParser, PolishExpressionParser, ExpressionConstants) {

    this.parse = (expression) => {
        const parsedExpression = this.transformExpression(expression);
        const polishExpression = PolishExpressionParser.parse(parsedExpression);
        return TreeExpressionParser.parse(polishExpression);
    };

    this.transformExpression = (expression) => {
        expression = addSpaceBetweenBracketAndMinus(expression); //fixed situation with (-
        const parsedExpression = expression.match(ExpressionConstants.PARSE_EXPRESSION);
        return trimExpression(parsedExpression);
    };

    function addSpaceBetweenBracketAndMinus(expression) {
        return expression.replace(ExpressionConstants.PARSE_EXCEPTION_MINUS, '( -');
    }

    function trimExpression(expression) {
        return _.map(expression, (symbol) => _.trim(symbol));
    }
}
