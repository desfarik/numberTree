import mainRouter from "./main.router";
import headerDirective from './header/header.directive';
import inputDirective from './input/input.directive';
import numberExpressionValidator from './input/service/number-expression.validator.service'
import numberExpressionTransformer from './input/service/number-expression.transformer'
import numberExpressionConstants from './input/constants/number-expression.constants'

export default angular.module('mainPage', ['ngMessages'])
    .config(mainRouter)
    .directive('ntHeader', headerDirective)
    .directive('ntInput', inputDirective)
    .constant('ExpressionConstants', numberExpressionConstants)
    .service('NumberExpressionValidator', numberExpressionValidator)
    .service('NumberExpressionTransformer', numberExpressionTransformer)
    .name;