import template from "./main.html"
import mainController from "./main.controller";

export default function MainRouter($stateProvider) {
    return $stateProvider.state('mainPage', {
        template,
        controller: mainController,
    })
}