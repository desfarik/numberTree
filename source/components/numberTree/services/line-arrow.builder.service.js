export default function LineArrowBuilderService(TreeConstants, EllipsePointCalculator, LineParamsCalculator) {

    this.buildConnectionsLines = () => refreshConnectionsTree();

    this.buildConnectionContainerElement = (style) => createConnectionContainerElement(style);

    function refreshConnectionsTree() {
        const pairs = document.getElementsByClassName(TreeConstants.CHILD_PAIR_CLASS);
        let linesContainer = document.getElementById(TreeConstants.TREE_CONNECTIONS_CONTAINER);
        _.forEach(pairs, (pair) => {
            let linesParams = LineParamsCalculator.calculate(pair, linesContainer.getBoundingClientRect());
            _.forEach(linesParams, (line) => linesContainer.appendChild(createLineElement(line)));
            linesContainer.appendChild(createOperandElement(pair, linesContainer.getBoundingClientRect()));
        })
    }

    function createOperandElement(pair, lineContainerContent) {
        const children = _.map(pair.children, (child) => {
            const coor = child.firstChild.getBoundingClientRect();
            return {
                x: coor.x - lineContainerContent.x + coor.width / 2,
                y: coor.y - lineContainerContent.y + 25,
                halfWidth: coor.width /2,
            };
        });
        return create(children, angular.element(pair)[0].attributes[TreeConstants.PAIR_OPERAND].value);
    }

    function create(params, operand) {
        const x =  params[0].x + params[0].halfWidth + (params[1].x- params[1].halfWidth - params[0].x - params[0].halfWidth)/2 - 16;
        const y = params[0].y - 14;
        let image = document.createElementNS('http://www.w3.org/2000/svg', 'image');
        image.setAttribute('x', x);
        image.setAttribute('y', y);
        image.setAttribute('href', `src/icons/${getOperator(operand)}.png`);
        return image;
    }

    function getOperator(operand) {
        return operands[operand];
    }

    const operands = {
        '+' : 'plus',
        '-' : 'minus',
        '*' : 'umn',
        '/' : 'del',
    };

    function createLineElement(lineParams) {
        let line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', lineParams.childX);
        line.setAttribute('y1', lineParams.childY);
        line.setAttribute('x2', lineParams.parentX);
        line.setAttribute('y2', lineParams.parentY);
        line.setAttribute('class', lineParams.class);
        line.setAttribute('stroke-width', '2');
        line.setAttribute("marker-end", "url(#arrow)");
        return line;
    }

    function createConnectionContainerElement(style) {
        let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('id', TreeConstants.TREE_CONNECTIONS_CONTAINER);
        svg.innerHTML = `<defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L0,6 L9,3 z" fill="#3f51b5"/></marker></defs>`;
        svg.style.width = style.scrollWidth;
        svg.style.height = style.scrollHeight;
        return svg;
    }
}