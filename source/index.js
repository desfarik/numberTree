import mainPage from "./components/main.module";

angular.module('app', ['ngMaterial', 'ui.router', 'mainPage'])
    .controller("ctrl", $state => $state.go('mainPage'));

