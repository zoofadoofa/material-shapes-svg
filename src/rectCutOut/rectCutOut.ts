import * as svgjs from 'svg.js';
import { Duration, Ease } from '../animation/animation.const';
import * as BezierEasing from 'bezier-easing';

export type CutOutAlignX = 'start' | 'center' | 'end';
export type CutOutAlignY = 'top' | 'bottom';
export type CutOutType = 'circle' | 'triangle';

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
            alignX: CutOutAlignX
        ): svgjs.MDSRectCutOut {
            if(alignX !== this._alignX) {
                this._alignX = alignX;
            }

            let path;
            let hidePath;
            switch(this._alignX) {
                case 'start': {
                    path = this._startPathOpen;
                    hidePath = this._startPathClosed;
                    break;
                }
                case 'center': {
                    path = this._centerPathOpen;
                    hidePath = this._centerPathClosed;
                    break;
                }
                case 'end': {
                    path = this._endPathOpen;
                    hidePath = this._endPathClosed;
                    break;
                }
            }


            if(this._isCutoutShowing) {
                return this.hide().animate(
                    Duration.large.in,
                    <any>BezierEasing(
                        Ease.standard.x1,
                        Ease.standard.x1,
                        Ease.standard.x1,
                        Ease.standard.x1
                    )).plot(path);
            } else {
                this._isCutoutShowing = true;
                return this.plot(hidePath).animate(
                    Duration.large.in,
                    <any>BezierEasing(
                        Ease.standard.x1,
                        Ease.standard.x1,
                        Ease.standard.x1,
                        Ease.standard.x1
                    )).plot(path);
            }
        },
        hideCutOut: function(): svgjs.MDSRectCutOut {
            let path;
            switch(this._alignX) {
                case 'start': {
                    path = this._startPathClosed;
                    break;
                }
                case 'center': {
                    path = this._centerPathClosed;
                    break;
                }
                case 'end': {
                    path = this._endPathClosed;
                    break;
                }
            }

            if(this._isCutoutShowing) {
                this._isCutoutShowing = false;
                return this.animate(Duration.large.out,
                    <any>BezierEasing(
                        Ease.standard.x1,
                        Ease.standard.x1,
                        Ease.standard.x1,
                        Ease.standard.x1
                    )).plot(path);
            } else {
                return this.plot(path);
            }
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
            alignX: CutOutAlignX,
            alignY: CutOutAlignY,
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