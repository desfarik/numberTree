export default function TreeBuilderService(TreeConstants) {

    this.build = (treeObject) => {
        return createChildContainerElement(treeObject);
    };

    function createChildContainerElement(child) {
        if (child.expression) {
            let div = document.createElement('div');
            div.className = TreeConstants.CHILD_CONTAINER_CLASS;
            div.appendChild(createChildElement(child));

            if (hasChild(child)) {
                div.appendChild(createChildPair(child.expression));
            }
            return div;
        }
    }

    function createChildElement(child) {
        let div = document.createElement('div');
        if (child.expression.descriptionValue) {
            let tooTip = document.createElement('md-tooltip');
            tooTip.setAttribute('md-z-index', '200');
            tooTip.setAttribute('md-delay', '300');
            tooTip.setAttribute('md-direction', 'top');
            tooTip.innerHTML = child.expression.descriptionValue;
            //tooTip.style.width = tooTip.style.height = '50';
            div.appendChild(tooTip);
            div.className = TreeConstants.HAS_CHILDREN;
        } else {
            div.className = TreeConstants.CHILD_CLASS;
        }
        div.innerHTML += `<div class="${TreeConstants.CHILD_CONTENT_CLASS}">${getChildValue(child)}</div>`;

        return div
    }

    function createChildPair(pair) {
        let div = document.createElement('div');
        div.className = TreeConstants.CHILD_PAIR_CLASS;
        div.setAttribute(TreeConstants.PAIR_OPERAND, pair.operand);
        div.appendChild(createChildContainerElement(pair.left));
        div.appendChild(createChildContainerElement(pair.right));
        return div;
    }

    function getChildValue(child) {
        return child.expression.left ? child.expression.fullValue : child.expression;
    }

    function hasChild(child) {
        return child.expression.left;
    }

}