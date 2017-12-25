import mainRouter from "./main.router";
import headerDirective from './header/header.directive';
import inputDirective from './input/input.directive';
import numberExpressionValidator from './input/service/number-expression.validator.service'

export default angular.module('mainPage',[require('angular-messages')])
    .config(mainRouter)
    .directive('ntHeader', headerDirective)
    .directive('ntInput', inputDirective)
    .service('NumberExpressionValidator', numberExpressionValidator)
    .name;