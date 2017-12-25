import template from './header.html'
require('./header.scss');

export default function HeaderDirective() {
    return {
        restrict: 'E',
        template,
    };
};
