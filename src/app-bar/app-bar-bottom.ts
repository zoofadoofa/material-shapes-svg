import * as svgjs from 'svg.js';
import { FabPosition, AppBarBottomSpecs } from './app-bar.const';
import * as BezierEasing from 'bezier-easing';
import { Duration, Ease } from '../core/animation/animation.const';

const mobileSpecs = AppBarBottomSpecs.mobile;
const fab = mobileSpecs.portrait.fab;
const cutChamferRadius = mobileSpecs.portrait.cutChamferRadius;
const height = mobileSpecs.portrait.height;

export type appBarCutoutState = 'collapsed' | 'expanded';

const getFabPosition = (position: FabPosition, width: number): number => {
    switch(position) {
        case "end": {
            return width - (fab.diameter - cutChamferRadius);
        }
        case "center":
        default: {
            return width/2;
        }
    }
}

const circlePath = (cx, cy, r): string => {
    return `
    M ${cx} ${cy}
    m ${-r} 0
    a ${r} ${r} 0 1 0 ${(r*2)} 0
    a ${r} ${r} 0 1 0 ${-(r*2)} 0
    `;
}

const cutoutPath = (
    x: number,
    y: number,
    radius: number,
    borderRadiusX: number,
    borderRadiusY: number
): string => {
    const outerRadius = radius + borderRadiusX;
    const convex = '0 0 1';
    const concave = '0 1 0';

    const p = `
        L ${x - outerRadius} ${-y}

        A
            ${borderRadiusX} ${borderRadiusY}
            ${convex}
            ${x - radius} ${-y + borderRadiusY}

        A
            ${radius} ${radius >= 4 ? radius - 4 : radius}
            ${concave}
            ${x + radius} ${-y + borderRadiusY}

        A
            ${borderRadiusX} ${borderRadiusY}
            ${convex}
            ${x + outerRadius} ${-y}

        L ${x + outerRadius} ${-y}
    `
    return p;
}

const getFabPathExpanded = (position: FabPosition, width: number): string => {
    return `
        M 0 0

        ${cutoutPath(
            getFabPosition(position, width),
            0,
            fab.radius + fab.cutMargin,
            cutChamferRadius,
            cutChamferRadius
        )}

        L ${width} 0
        L ${width} ${height}
        0 ${height}
        Z

        `;
        // ${circlePath(getFabPosition('center'), -fabRadius, fabRadius)}
};

const getFabPathCollapsed = (position: FabPosition, width: number): string => {
    return `
        M 0 0

        ${cutoutPath(
            getFabPosition(position, width),
            0,
            0,
            cutChamferRadius,
            0
        )}

        L ${width} 0
        L ${width} ${height}
        L 0 ${height}

        Z


        `;
        // ${circlePath(getFabPosition('center'), -fabRadius, fabRadius)}
};

export const GetHeight = () => {
    return height;
}

export const InitialPath = (state: appBarCutoutState, fabPosition: FabPosition, width: number): string => {

    switch(state) {
        case 'expanded': {
            return getFabPathExpanded(fabPosition, width);
        };
        case 'collapsed':
        default: {
            return getFabPathCollapsed(fabPosition, width);
        };
    }
}

export const CutoutCollapse = (path: svgjs.Path, fabPosition: FabPosition, width: number ) => {
    const pathCollapse = getFabPathCollapsed(fabPosition, width);

    // path.stop(false, true)
    <svgjs.Animation>(<any>path.animate(
        Duration.large.out,
        <any>BezierEasing(
            Ease.standard.x1,
            Ease.standard.y1,
            Ease.standard.x2,
            Ease.standard.y2
        ))
    ).plot(pathCollapse);
}

export const CutoutExpand = (path: svgjs.Path, fabPosition: FabPosition, width: number ) => {
    const pathExpand = getFabPathExpanded(fabPosition, width);

    // path.stop(false, true)
    <svgjs.Animation>(<any>path.animate(
        Duration.large.in,
        <any>BezierEasing(
            Ease.standard.x1,
            Ease.standard.y1,
            Ease.standard.x2,
            Ease.standard.y2
        ))
    ).plot(pathExpand)
}