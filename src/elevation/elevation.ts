import * as SVG from 'svg.js';
import { elevationMap } from './elevation.const';
import * as BezierEasing from 'bezier-easing';
import { Duration, Ease } from '../animation/animation.const';

// export interface BoxShadow {
//     x: number;
//     y: number;
//     blur: number;
//     spread: number;
// }

const convertBoxShadowBlurToSVGGaussianBlur = function(pixel: number): number {
    // See AmeliaBr's notes about blur in the comments section of link below
    // https://css-tricks.com/breaking-css-box-shadow-vs-drop-shadow/

    const deviationCoef = 0.2;
    const boxShadowToGaussianCoef = 2;
    return (pixel * deviationCoef) * boxShadowToGaussianCoef;
}

const clamp = function(value: number, min: number, max: number): number {
    return value >= max ? max : value <= min ? min : value;
}

const dropShadow = function(
    add: any,
    x: number,
    y: number,
    blur: number,
    spread: number,
    opacity: number
): SVG.Element {

    const deviatedBlur = convertBoxShadowBlurToSVGGaussianBlur(blur);
    const clampedOpacity = clamp(opacity, 0, 1);

    const filter = add
    .size('400%', '400%')
    .offset(x, y)
    .in(add.sourceAlpha)
    .gaussianBlur(deviatedBlur, deviatedBlur)
    .componentTransfer( {a: {type: "linear", slope: spread}})
    .colorMatrix("matrix", [
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, clampedOpacity, 0
    ]);

    return filter;
}

const animateElevation = function(offsetEffect: any, blurEffect: any, boxShadow: SVG.BoxShadow) {
    offsetEffect.stop(false, true);
    blurEffect.stop(false, true);
    const deviatedBlur = convertBoxShadowBlurToSVGGaussianBlur(boxShadow.blur);
    offsetEffect.animate(
        Duration.large.in,
        BezierEasing(
            Ease.standard.x1,
            Ease.standard.y1,
            Ease.standard.x2,
            Ease.standard.y2
        ))
        .attr('dx', boxShadow.x)
        .attr('dy', boxShadow.y + boxShadow.spread);
    blurEffect.animate(
        Duration.large.in,
        BezierEasing(
            Ease.standard.x1,
            Ease.standard.y1,
            Ease.standard.x2,
            Ease.standard.y2
        )).attr('stdDeviation', `${deviatedBlur} ${deviatedBlur}`);
}

// export const elevate = function(add: any, z: number) {
//     const u: SVG.BoxShadow = elevationMap.umbra[z];
//     const p: SVG.BoxShadow = elevationMap.penumbra[z];
//     const a: SVG.BoxShadow = elevationMap.ambient[z];

//     const uShadow = dropShadow(add, u.x, u.y + u.spread, u.blur, 1, elevationMap.umbra.opacity);
//     const pShadow = dropShadow(add, p.x, p.y + p.spread, p.blur, 1, elevationMap.penumbra.opacity);
//     const aShadow = dropShadow(add, a.x, a.y + a.spread, a.blur, 1, elevationMap.ambient.opacity);

//     add.merge(uShadow, pShadow, aShadow, add.source);

//     return add;
// }

// const elevate = (filter: any, z: number) => {
//     const effects = filter.children();
//     animateElevation(effects[0], effects[1], elevationMap.umbra[z]);
//     animateElevation(effects[4], effects[5], elevationMap.penumbra[z]);
//     animateElevation(effects[8], effects[9], elevationMap.ambient[z]);
// }

// export type zDepth =
// 0 | 1 | 2 | 3 |
// 4 | 5 | 6 | 7 |
// 8 | 9 | 10 | 11 |
// 12 | 13 | 14 | 15 |
// 16 | 17 | 18 | 19 |
// 20 | 21 | 22 | 23 | 24;

const MatShadow = SVG.invent({
    create: 'filter',
    inherit: SVG.Filter,
    extend: {
        elevate: (filter: any, z: number) => {
            const effects = filter.children();
            animateElevation(effects[0], effects[1], elevationMap.umbra[z]);
            animateElevation(effects[4], effects[5], elevationMap.penumbra[z]);
            animateElevation(effects[8], effects[9], elevationMap.ambient[z]);
        }
    },
    // construct: {
    //     matShadow: function(z: SVG.zDepth): SVG.MatShadow {
    //         return this.put(new MatShadow).filter((add) => {
    //             const u: SVG.BoxShadow = elevationMap.umbra[z];
    //             const p: SVG.BoxShadow = elevationMap.penumbra[z];
    //             const a: SVG.BoxShadow = elevationMap.ambient[z];

    //             const uShadow = dropShadow(add, u.x, u.y + u.spread, u.blur, 1, elevationMap.umbra.opacity);
    //             const pShadow = dropShadow(add, p.x, p.y + p.spread, p.blur, 1, elevationMap.penumbra.opacity);
    //             const aShadow = dropShadow(add, a.x, a.y + a.spread, a.blur, 1, elevationMap.ambient.opacity);

    //             add.merge(uShadow, pShadow, aShadow, add.source);

    //             return add;
    //         })
    //     }
    // }

})

SVG.extend(SVG.Filter, {
    elevate: function(z: number) {
        const effects = this.children();
        animateElevation(effects[0], effects[1], elevationMap.umbra[z]);
        animateElevation(effects[4], effects[5], elevationMap.penumbra[z]);
        animateElevation(effects[8], effects[9], elevationMap.ambient[z]);
        return this;
    }
})

SVG.extend(SVG.Element, {
    matShadow: function(z: SVG.zDepth) {
        return this.filter(function(add: any) {
            const u: SVG.BoxShadow = elevationMap.umbra[z];
            const p: SVG.BoxShadow = elevationMap.penumbra[z];
            const a: SVG.BoxShadow = elevationMap.ambient[z];

            const uShadow = dropShadow(add, u.x, u.y + u.spread, u.blur, 1, elevationMap.umbra.opacity);
            const pShadow = dropShadow(add, p.x, p.y + p.spread, p.blur, 1, elevationMap.penumbra.opacity);
            const aShadow = dropShadow(add, a.x, a.y + a.spread, a.blur, 1, elevationMap.ambient.opacity);

            add.merge(uShadow, pShadow, aShadow, add.source);

            return add;
        })
    }
})