export default function LineParamsCalculatorService(TreeConstants, EllipsePointCalculator) {

    const CIRCLE_RADIUS = 25;

    this.calculate = (pair, containerParams) => calculateLinesParams(pair, containerParams);

    function calculateLinesParams(pair, containerParams) {
        let parentParams = calculate(getPairParent(pair), containerParams);
        let childrenParams = calculateChild(pair, containerParams);
        childrenParams = _.merge(childrenParams, divideParent(childrenParams, parentParams[0], getFirstChildPairParent(pair)));
        return _.map(childrenParams, childParams => transformParams(childParams));
    }

    function calculate(children, containerParams) {
        let params = getChildContainersParams(_.concat([], children));
        return _.map(params, (param) => {
            return {
                top: param.top - containerParams.top + CIRCLE_RADIUS,
                left: param.left - containerParams.left + param.halfWidth,
            };
        })
    }

    function calculateChild(children, containerParams) {
        children = _.filter(children.children, {className: TreeConstants.CHILD_CONTAINER_CLASS});
        return calculate(children, containerParams);
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

    function divideParent(children, parent, parentElement) {
        let counter = 0;
        return _.map(children, child => getNewPointForParent(child, parent, parentElement, counter++));
    }

    function getNewPointForParent(child, parent, parentElement, counter) {
        return EllipsePointCalculator.calculatePoint(child, parent, parentElement, counter);
    }

    function getPairParent(pair) {
        return angular.element(pair)[0].parentElement;
    }

    function getFirstChildPairParent(pair) {
        return angular.element(angular.element(getPairParent(pair))[0].firstChild)[0]
    }

    function transformParams(child) {
        return {
            childY: child.top,
            childX: child.left,
            parentY: child.parentTop,
            parentX: child.parentLeft
        }
    }
}