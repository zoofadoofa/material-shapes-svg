import * as svgjs from 'svg.js';
import { Duration, Ease } from '../animation/animation.const';
import * as BezierEasing from 'bezier-easing';

const convex = '0 0 1';
const concave = '0 1 0';

const cutTopCircle = function(
    x: number,
    diameter: number,
    roundedX: number,
    roundedY: number
): string {
    const radius = diameter * 0.5;
    const outerRadius = radius + roundedX;
    return `
        L ${x - outerRadius} 0

        A ${roundedX} ${roundedY}
        ${convex}
        ${x - radius} ${roundedY}

        A ${radius} ${radius >= roundedX ? radius - roundedX : radius}
        ${concave}
        ${x + radius} ${roundedY}

        A ${roundedX} ${roundedY}
        ${convex}
        ${x + outerRadius} 0

        L ${x + outerRadius} 0
    `;

}

const cutBottomCircle = function(
    x: number,
    y: number,
    diameter: number,
    roundedX: number,
    roundedY: number
): string {
    const radius = diameter * 0.5;
    const outerRadius = radius + roundedX
    return `
        L ${x + outerRadius} ${y}

        A ${roundedX} ${roundedY}
        ${convex}
        ${x + radius} ${y - roundedY}

        A ${radius} ${radius >= roundedX ? radius - roundedX : radius}
        ${concave}
        ${x - radius} ${y - roundedY}

        A ${roundedX} ${roundedY}
        ${convex}
        ${x - outerRadius} ${y}

        L ${x - outerRadius} ${y}
    `;
}

const createCirclePaths = function (
    width: number,
    height: number,
    rectCutOut: svgjs.MDSRectCutOut
) {
    const halfWidth = width * 0.5;
    const topPathBeforeCutOut = `M 0 0`;
    const topPathAfterCutOut =`
        L ${width} 0
        L ${width} ${height}
        L 0 ${height}
        Z
    `;
    const bottomPathBeforeCutOut = `
        M 0 0
        L ${width} 0
        L ${width} ${height}
    `;
    const bottomPathAfterCutOut = `
        L 0 ${height}
        Z
    `;

    const insertTopCutOut = function (cutOutPath: string): string {
        return `${topPathBeforeCutOut} ${cutOutPath} ${topPathAfterCutOut}`;
    }

    const insertBottomCutOut = function (cutOutPath: string): string {
        return `${bottomPathBeforeCutOut} ${cutOutPath} ${bottomPathAfterCutOut}`;
    }


    if (rectCutOut._alignY === 'top') {
        rectCutOut._startPathOpen = insertTopCutOut(
            cutTopCircle(
                rectCutOut._edgeDistance,
                rectCutOut._diameter,
                rectCutOut._rounded,
                rectCutOut._rounded
            )
        );
        rectCutOut._startPathClosed = insertTopCutOut(
            cutTopCircle(
                rectCutOut._edgeDistance,
                0,
                rectCutOut._rounded,
                0
            )
        );
        rectCutOut._centerPathOpen = insertTopCutOut(
            cutTopCircle(
                halfWidth,
                rectCutOut._diameter,
                rectCutOut._rounded,
                rectCutOut._rounded
            )
        );
        rectCutOut._centerPathClosed = insertTopCutOut(
            cutTopCircle(
                halfWidth,
                0,
                rectCutOut._rounded,
                0
            )
        );
        rectCutOut._endPathOpen = insertTopCutOut(
            cutTopCircle(
                width - rectCutOut._edgeDistance,
                rectCutOut._diameter,
                rectCutOut._rounded,
                rectCutOut._rounded
            )
        );
        rectCutOut._endPathClosed = insertTopCutOut(
            cutTopCircle(
                width - rectCutOut._edgeDistance,
                0,
                rectCutOut._rounded,
                0
            )
        );

    } else {
        rectCutOut._startPathOpen = insertBottomCutOut(
            cutBottomCircle(
                rectCutOut._edgeDistance,
                height,
                rectCutOut._diameter,
                rectCutOut._rounded,
                rectCutOut._rounded
            )
        );
        rectCutOut._startPathClosed = insertBottomCutOut(
            cutBottomCircle(
                rectCutOut._edgeDistance,
                height,
                0,
                rectCutOut._rounded,
                0
            )
        )
        rectCutOut._centerPathOpen = insertBottomCutOut(
            cutBottomCircle(
                halfWidth,
                height,
                rectCutOut._diameter,
                rectCutOut._rounded,
                rectCutOut._rounded
            )
        );
        rectCutOut._centerPathClosed = insertBottomCutOut(
            cutBottomCircle(
                halfWidth,
                height,
                0,
                rectCutOut._rounded,
                0
            )
        )
        rectCutOut._endPathOpen = insertBottomCutOut(
            cutBottomCircle(
                width - rectCutOut._edgeDistance,
                height,
                rectCutOut._diameter,
                rectCutOut._rounded,
                rectCutOut._rounded
            )
        );
        rectCutOut._endPathClosed = insertBottomCutOut(
            cutBottomCircle(
                width - rectCutOut._edgeDistance,
                height,
                0,
                rectCutOut._rounded,
                0
            )
        )
    }

    return rectCutOut;
}

const getClosedPath = function(rectCutOut: svgjs.MDSRectCutOut, alignX: svgjs.CutOutAlignX): string {
    switch(alignX) {
        case 'start': {
            return rectCutOut._startPathClosed;
        }
        case 'center': {
            return rectCutOut._centerPathClosed;
        }
        case 'end': {
            return rectCutOut._endPathClosed;
        }
    }
}

const getOpenPath = function(rectCutOut: svgjs.MDSRectCutOut, alignX: svgjs.CutOutAlignX): string {
    switch(alignX) {
        case 'start': {
            return rectCutOut._startPathOpen;
        }
        case 'center': {
            return rectCutOut._centerPathOpen;
        }
        case 'end': {
            return rectCutOut._endPathOpen;
        }
    }
}

const getTransition = function(isSameAlignment: boolean, isOpen: boolean): svgjs.CutOutTransition {
    if (isSameAlignment) {
        if(isOpen) {
            return 'none';
        } else {
            return 'opening';
        }
    } else {
        if(isOpen) {
            return 'opened-switch';
        } else {
            return 'closed-switch';
        }
    }
}

const openCutOut = function(rectCutOut: svgjs.MDSRectCutOut, alignX: svgjs.CutOutAlignX, transition: svgjs.CutOutTransition) {
    switch(transition) {
        case 'none': {
            return;
        }
        case 'opening': {
            rectCutOut.stop(false, true);
            rectCutOut.animate(
                Duration.small.simple,
                BezierEasing(
                    Ease.standard.x1,
                    Ease.standard.x1,
                    Ease.standard.x1,
                    Ease.standard.x1
                )
            )
            .plot(getOpenPath(rectCutOut, rectCutOut._alignX))
            return;
        }
        case 'closed-switch': {
            rectCutOut.stop(false, true);
            rectCutOut.plot(getClosedPath(rectCutOut, alignX)).animate(
                Duration.small.simple,
                BezierEasing(
                    Ease.standard.x1,
                    Ease.standard.x1,
                    Ease.standard.x1,
                    Ease.standard.x1
                )).plot(getOpenPath(rectCutOut, alignX));
            return;
        }
        case 'opened-switch': {
            rectCutOut.stop(false, true);
            rectCutOut.animate(
                    Duration.small.simple,
                    BezierEasing(
                        Ease.standard.x1,
                        Ease.standard.x1,
                        Ease.standard.x1,
                        Ease.standard.x1
                    )
                )
                .plot(getClosedPath(rectCutOut, rectCutOut._alignX)).after(function(){
                    return rectCutOut.plot(getClosedPath(rectCutOut, alignX)).animate(
                        Duration.small.simple,
                        BezierEasing(
                            Ease.standard.x1,
                            Ease.standard.x1,
                            Ease.standard.x1,
                            Ease.standard.x1
                        )
                    )
                    .plot(getOpenPath(rectCutOut, alignX));
                });
            return;
        }
    }
}

const MDSRectCutOut = svgjs.invent({
    create: 'path',
    inherit: svgjs.Path,
    extend: {
        _alignX: '',
        _alignY: '',
        _edgeDistance: 0,
        _rounded: 0,
        _diameter: 0,
        _startPathOpen: '',
        _centerPathOpen: '',
        _endPathOpen: '',
        _startPathClosed: '',
        _centerPathClosed: '',
        _endPathClosed: '',
        _isCutoutShowing: false,
        _updatePaths: function(): svgjs.MDSRectCutOut {
            return this;
        },
        showCutOut: function(
            alignX: svgjs.CutOutAlignX
        ): svgjs.MDSRectCutOut {
            const isSameAlignment = alignX === this._alignX;

            console.log(this._isCutoutShowing);
            const transition = getTransition(isSameAlignment, this._isCutoutShowing);

            openCutOut(this, alignX, transition);

            this._alignX = alignX;
            this._isCutoutShowing = true;

            return this;
        },
        hideCutOut: function(): svgjs.MDSRectCutOut {
            const path = getClosedPath(this, this._alignX);
            if(this._isCutoutShowing) {
                this.stop(false, true);
                this.animate(Duration.small.simple,
                    BezierEasing(
                        Ease.standard.x1,
                        Ease.standard.x1,
                        Ease.standard.x1,
                        Ease.standard.x1
                    )).plot(path);
            }
            this._isCutoutShowing = false;

            return this;
        },
        resize: function(
            width: number,
            height: number
        ): svgjs.MDSRectCutOut {
            return this._updatePaths(width, height, this);
        }
    },
    construct: {
        circleCutOut: function(
            width: number,
            height: number,
            diameter: number,
            alignX: svgjs.CutOutAlignX,
            alignY: svgjs.CutOutAlignY,
            padding?: number,
            rounded?: number,
            showCutOut?: boolean
        ) {
            let rectCutOut: svgjs.MDSRectCutOut = this.put(new MDSRectCutOut);
            const paddingSize = padding ? padding : 0;
            const roundSize = rounded ? rounded : 0;
            const show = showCutOut ? showCutOut : false;

            rectCutOut._alignX = alignX;
            rectCutOut._alignY = alignY;
            rectCutOut._diameter = diameter;
            rectCutOut._edgeDistance = paddingSize + diameter * 0.5;
            rectCutOut._rounded = roundSize;
            rectCutOut._isCutoutShowing = show;
            rectCutOut._updatePaths = createCirclePaths;

            rectCutOut._updatePaths(width, height, rectCutOut);

            let path;
            switch(alignX) {
                case 'start': {
                    path = show ? rectCutOut._startPathOpen : rectCutOut._startPathClosed;
                    break;
                }
                case 'center': {
                    path = show ? rectCutOut._centerPathOpen : rectCutOut._centerPathClosed;
                    break;
                }
                case 'end': {
                    path = show ? rectCutOut._endPathOpen : rectCutOut._endPathClosed;
                    break;
                }
            }

            return rectCutOut.plot(path);
        }
    }
});