export default function TreeBuilderService(TreeConstants) {

    this.build = (treeObject) => {
        return createChildContainerElement(treeObject);
    };

    function createChildContainerElement(child) {
        if (child.expression) {
            let div = document.createElement('div');
            div.className = TreeConstants.CHILD_CONTAINER_CLASS;
            div.appendChild(createChildElement(getChildValue(child)));

            if (hasChild(child)) {
                div.appendChild(createChildPair(child.expression));
            }
            return div;
        }
    }

    function createChildElement(content) {
        let div = document.createElement('div');
        div.className = TreeConstants.CHILD_CLASS;
        div.innerHTML = `<div class="${TreeConstants.CHILD_CONTENT_CLASS}">${content}</div>`;
        return div
    }

    function createChildPair(pair) {
        let div = document.createElement('div');
        div.className = TreeConstants.CHILD_PAIR_CLASS;
        div.appendChild(createChildContainerElement(pair.left));
        div.appendChild(createOperand(pair.operand));
        div.appendChild(createChildContainerElement(pair.right));
        return div;
    }

    function createOperand(operand) {
        let div = document.createElement('div');
        div.className = TreeConstants.PAIR_OPERAND_CLASS;
        div.innerHTML = operand;
        return div;
    }

    function getChildValue(child) {
        return child.expression.left ? child.expression.fullValue : child.expression;
    }

    function hasChild(child) {
        return child.expression.left;
    }

}