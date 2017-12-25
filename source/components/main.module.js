import mainRouter from "./main.router";
import headerDirective from './header/header.directive';
import inputDirective from './input/input.directive';

export default angular.module('mainPage',['ngMessages'])
    .config(mainRouter)
    .directive('ntHeader', headerDirective)
    .directive('ntInput', inputDirective)
    .name;