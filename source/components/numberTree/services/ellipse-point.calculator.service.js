export default function EllipsePointCalculatorService() {

    this.calculatePoint = (child, parent, ellipse, isRightChild) => getPointOnEllipse(child, parent, ellipse, isRightChild);

    function getPointOnEllipse(child, parent, ellipse, isRightChild) {
        let angular = getAngularBetweenVectors(child, parent);
        let ellipseRadius = getEllipseRadius(ellipse, (angular + 90) * Math.PI / 180);
        if (isRightChild) {
            angular = (angular) * Math.PI / 180;
        } else {
            angular = (-angular) * Math.PI / 180;
        }
        return {
            parentTop: parent.top + ellipseRadius * Math.cos(angular),
            parentLeft: parent.left + ellipseRadius * Math.sin(angular)
        }
    }

    function getAngularBetweenVectors(child, parent) {
        const leg1 = Math.abs(child.left - parent.left);
        const let2 = Math.abs(child.top - parent.top);
        const hypotenuse = Math.sqrt(raiseToSecondPow(leg1) + raiseToSecondPow(let2));
        return Math.asin(leg1 / hypotenuse) * 180 / Math.PI;
    }

    function getEllipseRadius(ellipse, angular) {
        const halfHeight = ellipse.clientHeight / 2;
        const halfWidth = ellipse.clientWidth / 2;
        return (halfHeight * halfWidth) /
            Math.sqrt(raiseToSecondPow(halfHeight) * raiseToSecondPow(Math.cos(angular))
                + raiseToSecondPow(halfWidth) * raiseToSecondPow(Math.sin(angular)));
    }

    function raiseToSecondPow(num) {
        return Math.pow(num, 2)
    }
}