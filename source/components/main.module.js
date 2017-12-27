import mainRouter from "./main.router";
import headerDirective from './header/header.directive';
import inputDirective from './input/input.directive';
import numberTreeDirective from './numberTree/number-tree.directive';

import numberExpressionConstants from './services/constants/number-expression.constants';
import TreeConstants from './numberTree/services/constants/tree-classes.constants';

import numberExpressionValidator from './input/services/number-expression.validator.service';
import numberExpressionTransformer from './input/services/number-expression.transformer';
import numberExpressionParser from './services/number-expression.parser.service';
import polishExpressionParser from './services/polish-expression.parser.service';
import treeExpressionParser from './services/tree-expression.parser.service';
import treeBuilder from './numberTree/services/tree-builder.service';

export default angular.module('mainPage', ['ngMessages'])
    .config(mainRouter)
    .directive('ntHeader', headerDirective)
    .directive('ntInput', inputDirective)
    .directive('numberTree', numberTreeDirective)
    .constant('ExpressionConstants', numberExpressionConstants)
    .constant('TreeConstants', TreeConstants)
    .service('NumberExpressionValidator', numberExpressionValidator)
    .service('NumberExpressionTransformer', numberExpressionTransformer)
    .service('NumberExpressionParser', numberExpressionParser)
    .service('PolishExpressionParser', polishExpressionParser)
    .service('TreeExpressionParser', treeExpressionParser)
    .service('TreeBuilder', treeBuilder)
    .name;