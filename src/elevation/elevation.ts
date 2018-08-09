import * as SVG from 'svg.js';
import { ElevationMap } from './elevation.const';
import * as BezierEasing from 'bezier-easing';
import { Duration, Ease } from '../animation/animation.const';

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

const animateElevation = function(
    offsetEffect: any,
    blurEffect: any,
    boxShadow: SVG.MDSBoxShadow
) {
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

SVG.extend(SVG.Filter, {
    elevate: function(z: SVG.zDepth) {
        const effects = this.children();
        animateElevation(effects[0], effects[1], ElevationMap.umbra[z]);
        animateElevation(effects[4], effects[5], ElevationMap.penumbra[z]);
        animateElevation(effects[8], effects[9], ElevationMap.ambient[z]);
        return this;
    }
})

SVG.extend(SVG.Shape, {
    elevation: function(z: SVG.zDepth): SVG.Filter {
        return this.filter(function(add: SVG.Filter) {
            const u: SVG.MDSBoxShadow = ElevationMap.umbra[z];
            const p: SVG.MDSBoxShadow = ElevationMap.penumbra[z];
            const a: SVG.MDSBoxShadow = ElevationMap.ambient[z];

            const uShadow = dropShadow(add, u.x, u.y + u.spread, u.blur, 1, ElevationMap.umbra.opacity);
            const pShadow = dropShadow(add, p.x, p.y + p.spread, p.blur, 1, ElevationMap.penumbra.opacity);
            const aShadow = dropShadow(add, a.x, a.y + a.spread, a.blur, 1, ElevationMap.ambient.opacity);

            add.merge(uShadow, pShadow, aShadow, add.source);

            return add;
        })
    }
})