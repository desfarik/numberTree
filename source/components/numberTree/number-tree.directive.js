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
            refreshTreeBody(tree);
            refreshConnectionsTreeContainer();
            refreshConnectionsTree();
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
        treeWrapper.insertBefore(createConnectionContainerElement(angular.element(treeWrapper)[0]), treeWrapper.firstChild);
    }

    function getTree(treeWrapper) {
        return _.find(treeWrapper.children, {className: TreeConstants.CHILD_CONTAINER_CLASS});
    }

    function getConnectionsTreeContainer(treeWrapper) {
        return _.find(treeWrapper.children, {id: TreeConstants.TREE_CONNECTIONS_CONTAINER});
    }

    function refreshConnectionsTree() {
        let pairs = document.getElementsByClassName(TreeConstants.CHILD_PAIR_CLASS);
        let line = {x1: 0, y1: 0, x2: 50, y2: 100, class: "lineToChild"};
        let linesContainer = document.getElementById('lines-container');
        // linesContainer.appendChild(createLineElement(line));
        let containerParams = linesContainer.getBoundingClientRect();
        _.forEach(pairs, (pair) => {
            let linesParams = calculateLinesParams(pair, containerParams);
            console.log(linesParams);
            _.forEach(linesParams, (line) => linesContainer.appendChild(createLineElement(line)));

        })
    }

    function createLineElement(lineParams) {
        let line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', lineParams.childX);
        line.setAttribute('y1', lineParams.childY);
        line.setAttribute('x2', lineParams.parentX);
        line.setAttribute('y2', lineParams.parentY);
        line.setAttribute('class', lineParams.class);
        line.setAttribute('stroke-width', 2);
        line.setAttribute("marker-end", "url(#arrow)");
        return line;
    }

    function calculateLinesParams(pair, containerParams) {
        let parentParams = calculate(angular.element(pair)[0].parentElement, containerParams);
        //console.log("parent", parentParams);
        let childrenParams = calculateChild(pair, containerParams);
        //console.log('child', childrenParams);

        childrenParams = _.merge(childrenParams, divideParent(childrenParams, parentParams[0], angular.element(angular.element(angular.element(pair)[0].parentElement)[0].firstChild)[0]));
        //console.log(childrenParams);
        return _.map(childrenParams, childParams => transformParams(childParams));
    }

    function divideParent(children, parent, parentElement) {
        //console.log(_.map(children, child => getPointOnEllips(child, parent, parentElement)));
        let i = 0;
        return _.map(children, child => getPointOnEllips(child, parent, parentElement, i++));
    }

    function calculate(children, containerParams) {
        let params = getChildContainersParams(_.concat([], children));
        return _.map(params, (param) => {
            return {
                top: param.top - containerParams.top + 25,
                left: param.left - containerParams.left + param.halfWidth,
            };
        })
    }


    function calculateChild(children, containerParams) {
        children = _.filter(children.children, {className: TreeConstants.CHILD_CONTAINER_CLASS});
        return calculate(children, containerParams);
    }

    function transformParams(child) {
        return {
            childY: child.top,
            childX: child.left,
            parentY: child.parentTop,
            parentX: child.parentLeft
        }
    }

    function getChildContainersParams(children) {
        return _.map(children, (child) => {
            const params = child.getBoundingClientRect();
            return {
                top: params.top,
                left: params.left,
                halfWidth: angular.element(child)[0].clientWidth / 2,
            }
        });
    }

    function createConnectionContainerElement(style) {
        let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('id', TreeConstants.TREE_CONNECTIONS_CONTAINER);
        svg.innerHTML = `<defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L0,6 L9,3 z" fill="blue"/></marker></defs>`;
        svg.style.width = style.clientWidth;
        svg.style.height = style.clientHeight;
        return svg;
    }

    function getPointOnEllips(child, parent, ellips, i) {
        let angular = getAngularBetweenVectors(child, parent);
        let ellpsRadius = getEllipsRadius(ellips, (angular + 90) * Math.PI / 180);
        if (i) {
            angular = (angular) * Math.PI / 180;
        } else {
            angular = (-angular) * Math.PI / 180;
        }
        return {
            parentTop: parent.top + ellpsRadius * Math.cos(angular),
            parentLeft: parent.left + ellpsRadius * Math.sin(angular)
        }
    }

    function getEllipsRadius(ellips, angular) {
        return (ellips.clientHeight / 2 * ellips.clientWidth / 2) / Math.sqrt(Math.pow(ellips.clientHeight / 2, 2) * Math.pow(Math.cos(angular), 2) + Math.pow(ellips.clientWidth / 2, 2) * Math.pow(Math.sin(angular), 2));
    }

    function getAngularBetweenVectors(child, parent) {
        const katet1 = Math.abs(child.left - parent.left);
        const katet2 = Math.abs(child.top - parent.top);
        const gipotinuza = Math.sqrt(katet1 * katet1 + katet2 * katet2);
        return Math.asin(katet1 / gipotinuza) * 180 / Math.PI;
    }
};
