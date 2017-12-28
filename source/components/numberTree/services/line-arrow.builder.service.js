export default function LineArrowBuilderService(TreeConstants, EllipsePointCalculator, LineParamsCalculator) {

    this.buildConnectionsLines = () => refreshConnectionsTree();

    this.buildConnectionContainerElement = (style) => createConnectionContainerElement(style);

    function refreshConnectionsTree() {
        const pairs = document.getElementsByClassName(TreeConstants.CHILD_PAIR_CLASS);
        let linesContainer = document.getElementById(TreeConstants.TREE_CONNECTIONS_CONTAINER);
        _.forEach(pairs, (pair) => {
            let linesParams = LineParamsCalculator.calculate(pair, linesContainer.getBoundingClientRect());
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
        line.setAttribute('stroke-width', '2');
        line.setAttribute("marker-end", "url(#arrow)");
        return line;
    }

    function createConnectionContainerElement(style) {
        let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('id', TreeConstants.TREE_CONNECTIONS_CONTAINER);
        svg.innerHTML = `<defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L0,6 L9,3 z" fill="blue"/></marker></defs>`;
        svg.style.width = style.clientWidth;
        svg.style.height = style.clientHeight;
        return svg;
    }
}