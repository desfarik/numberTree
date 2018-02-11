import template from './number-tree.html'

require('./number-tree.scss');

export default function NumberTreeDirective(TreeBuilder, TreeConstants, LineArrowBuilder, $compile) {
    return {
        restrict: 'E',
        template,
        scope: {
            inputTree: '='
        },
        link: function (scope, element) {
            scope.$watch('inputTree', (tree) => {
                refreshTree(tree, element,scope);
            });
        }
    };

    function refreshTree(tree, element,scope) {
        if (tree) {
            refreshTreeBody(tree);
            $compile(element.contents())(scope);
            refreshConnectionsTreeContainer();
            LineArrowBuilder.buildConnectionsLines();
        }
    }

    function refreshTreeBody(tree) {
        let treeWrapper = document.getElementById(TreeConstants.TREE_WRAPPER_ELEMENT_ID);
        treeWrapper.removeChild(getTree(treeWrapper));
        treeWrapper.appendChild(TreeBuilder.build(tree));
    }

    function refreshConnectionsTreeContainer() {
        let treeWrapper = document.getElementById(TreeConstants.TREE_WRAPPER_ELEMENT_ID);
        treeWrapper.removeChild(getConnectionsTreeContainer(treeWrapper));
        treeWrapper.insertBefore(LineArrowBuilder.buildConnectionContainerElement(angular.element(treeWrapper)[0]), treeWrapper.firstChild);
    }

    function getTree(treeWrapper) {
        return _.find(treeWrapper.children, {className: TreeConstants.CHILD_CONTAINER_CLASS});
    }

    function getConnectionsTreeContainer(treeWrapper) {
        return _.find(treeWrapper.children, {id: TreeConstants.TREE_CONNECTIONS_CONTAINER});
    }
};
