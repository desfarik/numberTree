export default {
    SPACE_AFTER: /(?:[\(\)\+\-\*\/]?)\s+/g,
    SPACE_BEFORE: /\s+(?=[\(\)\+\-\*\/])/g,
    LEFT_BRACKET: /\(/g,
    RIGHT_BRACKET: /\)/g,
    VERIFY_LEFT_BRACKET: /\([\(\d]/g,
    VERIFY_RIGHT_BRACKET: /\)[\)\-\/\+\*]|\)$/g,
    DUPLICATE_LEFT_BRACKETS: /\({2}/g,
    DUPLICATE_RIGHT_BRACKETS: /\){2}/g,
    VERIFY_NUMBER: /\d+[\)\-\/\+\*]/g,
    NUMBERS: /\d+/g,
    SYMBOLS: /[\-\/\+\*]/g,
    VERIFY_SYMBOL: /[\-\/\+\*][\d\(]/g
}