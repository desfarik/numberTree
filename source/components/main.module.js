import mainRouter from "./main.router";
import headerDirective from './header/header.directive';
import inputDirective from './input/input.directive';
import numberExpressionValidator from './input/service/number-expression.validator.service';
import numberExpressionTransformer from './input/service/number-expression.transformer';
import numberExpressionConstants from './constants/number-expression.constants';
import numberExpressionParser from './services/number-expression.parser.service';
import polishExpressionParser from './services/polish-expression.parser.service';
import treeExpressionParser from './services/tree-expression.parser.service';

export default angular.module('mainPage', ['ngMessages'])
    .config(mainRouter)
    .directive('ntHeader', headerDirective)
    .directive('ntInput', inputDirective)
    .constant('ExpressionConstants', numberExpressionConstants)
    .service('NumberExpressionValidator', numberExpressionValidator)
    .service('NumberExpressionTransformer', numberExpressionTransformer)
    .service('NumberExpressionParser', numberExpressionParser)
    .service('PolishExpressionParser', polishExpressionParser)
    .service('TreeExpressionParser', treeExpressionParser)
    .name;