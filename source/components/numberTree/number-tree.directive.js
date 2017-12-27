import template from './number-tree.html'

require('./number-tree.scss');

export default function NumberTreeDirective(TreeBuilder, TreeConstants) {
    return {
        restrict: 'E',
        template,
        scope: {
            inputTree: '='
        },
        link: function (scope) {
            scope.$watch('inputTree', (tree) => refreshTree(tree));
        }
    };

    function refreshTree(tree) {
        if (tree) {
            refreshTreeBody(tree)
        }
    }

    function refreshTreeBody(tree) {
        console.log(TreeBuilder.build(tree));
        let treeWrapper = document.getElementById(TreeConstants.TREE_WRAPPER_ELEMENT_ID);
        if (hasOldTree(treeWrapper)) {
            treeWrapper.removeChild(treeWrapper.lastChild);
        }
        treeWrapper.appendChild(TreeBuilder.build(tree));
        console.log(document.getElementsByClassName(TreeConstants.CHILD_PAIR_CLASS));
    }

    function hasOldTree(startTree) {
        return _.find(startTree.children, {className: TreeConstants.CHILD_CONTAINER_CLASS});
    }

};
