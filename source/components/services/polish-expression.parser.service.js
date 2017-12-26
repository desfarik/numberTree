export default function PolishExpressionParser(ExpressionConstants) {

    let outputExpression = [];
    let operandStack = [];

    const NUMBER = "NUMBER";
    const OPERAND = "OPERAND";
    const BRACKET = "BRACKET";
    const FIRST_BRACKET = "(";
    const LAST_BRACKET = ")";

    const OPERAND_PRIORITY = {
        "(": 1,
        "+": 2,
        "-": 2,
        "*": 3,
        "/": 3,
        "^": 3,
    };

    this.parse = (expression) => {
        clearData();
        return parseExpression(expression);
    };

    function clearData() {
        operandStack = [];
        outputExpression = [];
    }

    function parseExpression(expression) {
        _.forEach(expression, (symbol) =>
            SYMBOL_CALLBACKS[getTypeSymbol(symbol)].callback(symbol));
        return concatExpressionAndOperands();
    }

    function concatExpressionAndOperands() {
        return _.concat(outputExpression, _.reverse(operandStack));
    }

    function getTypeSymbol(symbol) {
        if (symbol.match(ExpressionConstants.CHECK_NUMBER)) {
            return NUMBER;
        } else if (symbol === LAST_BRACKET) {
            return BRACKET;
        } else {
            return OPERAND;
        }
    }

    const SYMBOL_CALLBACKS = {
        NUMBER: {
            callback: (number) => outputExpression.push(number)
        },
        OPERAND: {
            callback: (currentOperand) => operandCallBack(currentOperand)
        },
        BRACKET: {
            callback: () => bracketCallBack()
        }
    };

    function operandCallBack(currentOperand) {
        operandStack = _.dropRightWhile(operandStack, (operand) => {
            if (OPERAND_PRIORITY[operand] > OPERAND_PRIORITY[currentOperand] && OPERAND_PRIORITY[currentOperand] !== 1) { //if first bracket need push
                outputExpression.push(operand);
                return true;
            } else {
                return false;
            }
        });
        operandStack.push(currentOperand);
    }

    function bracketCallBack() {
        operandStack = _.dropRightWhile(operandStack, (operand) => {
            if (operand !== FIRST_BRACKET) {
                outputExpression.push(operand);
                return true
            } else {
                return false;
            }
        });
        operandStack.pop(); //delete FIRST_BRACKET;
    }
};