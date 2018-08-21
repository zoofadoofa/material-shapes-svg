import { Circle, Doc, Element, Path, Shape, Parent } from 'svg.js';

declare module "svg.js" {

    interface Library {
        on(document: Document, eventName: string, callback: Function)
    }

    export type MDSContrast = 'light' | 'dark';

    // ripple.ts
    export interface MDSRipple extends Circle {
        _initialSize: number;
        _maxDiameter: number;
        contrast: MDSContrast;
        reset(): this;
        expand(x: number, y: number): this;
        updateMinMax(width: number, height: number): this;
    }

    interface Shape {
        ripple(contrast?: MDSContrast): MDSRipple;
    }

    interface Library {
        MDSRipple: MDSRipple;
    }

    // rectCutOut.ts
    export interface MDSRectCutOut extends Path {
        _alignX: CutOutAlignX;
        _alignY: CutOutAlignY;
        _edgeDistance: number,
        _chamfer: number,
        _diameter: number,
        _isCutoutShowing: boolean,
        _startPathOpen: string,
        _centerPathOpen: string,
        _endPathOpen: string,
        _startPathClosed: string,
        _centerPathClosed: string,
        _endPathClosed: string,
        _updatePaths(width: number, height:number, rectCutOut: MDSRectCutOut): this;
        showCutOut(alignX: CutOutAlignX): this;
        hideCutOut(): this;
        resize(width: number, height: number): this;
    }

    export type CutOutAlignX = 'start' | 'center' | 'end';
    export type CutOutAlignY = 'top' | 'bottom';
    export type CutOutType = 'circle' | 'triangle';
    export type CutOutTransition = 'none' | 'opening' | 'closed-switch' | 'opened-switch';

    interface Element {
        animate(duration?: number, ease?: Function, delay?: number): Animation;
    }

    interface Animation {
        plot(d: PathArrayAlias): this;
    }

    interface Doc {
        circleCutOut(
            width: number,
            height: number,
            diameter: number,
            alignX: CutOutAlignX,
            alignY: CutOutAlignY,
            padding?: number,
            rounded?: number,
            showCutOut?: boolean
        ): MDSRectCutOut;
        triangleCutOut(
            width: number,
            height: number,
            diameter: number,
            alignX: CutOutAlignX,
            alignY: CutOutAlignY,
            padding?: number,
            rounded?: number,
            showCutOut?: boolean
        ): MDSRectCutOut;
    }

    interface Library {
        MDSRectCutOut: MDSRectCutOut;
    }


    // chamferRect.ts
    export interface MDSChamferRect extends Path {
        chamfer(width: number, height: number, cut: number): this;
        chamfer(
            width: number,
            height: number,
            cutTopLeft: number,
            cutTopRight: number,
            cutBottomRight: number,
            cutBottomLeft: number
        ): this;
    }

    interface Doc {
        chamferRect(width: number, height: number, cut: number): MDSChamferRect;
        chamferRect(
            width: number,
            height: number,
            cutTopLeft: number,
            cutTopRight: number,
            cutBottomRight: number,
            cutBottomLeft: number
        ): MDSChamferRect;
    }

    interface Library {
        MDSChamferRect: MDSChamferRect;
    }

    // elevation.ts
    export interface MDSBoxShadow {
        x: number;
        y: number;
        blur: number;
        spread: number;
    }
    
    export type zDepth =
    0 | 1 | 2 | 3 |
    4 | 5 | 6 | 7 |
    8 | 9 | 10 | 11 |
    12 | 13 | 14 | 15 |
    16 | 17 | 18 | 19 |
    20 | 21 | 22 | 23 | 24;

    // fill in missing typings for svg.filter.js
    export interface Filter extends Parent {
        source: string;
        sourceAlpha: string;
        background: string;
        backgroundAlpha: string;
        // fill: string; // name conflict with SVG.Parent
        // stroke: string; // name conflict with SVG.Parent
        autoSetIn: boolean;
    
        put(element, i): any;
        blend(in1, in2, mode): any;
        colorMatrix(type, values): any;
        convolveMatrix(matrix): any;
        componentTransfer(components): any;
        composite(in1, in2, operator): any;
        flood(color, opacity): any;
        offset(x, y): any;
        image(src): any;
        merge(in1, in2?, in3?, in4?, in5?, in6?, in7?, in8?): any;
        gaussianBlur(x, y): any;
        morphology(operator, radius): any;
        diffuseLighting(surfaceScale,diffuseConstant,kernelUnitLength): any;
        displacementMap(in1, in2, scale, xChannelSelector, yChannelSelector): any;
        specularLighting(surfaceScale, diffuseConstant, specularExponent, kernelUnitLength): any;
        tile(): any;
        turbulence(baseFrequency, numOctaves, seed, stitchTiles, type): any;
        toString(): string;

        elevate(z: zDepth): this;
    }

    interface Shape {
        elevation(z: zDepth): Filter;
    }

    interface Library {
        Filter: Filter;
    }
}

// refactor to merge svgjs manual typings with typings generated from src code

interface IComplexDuration {
    simple: number;
    in: number;
    out: number;
    complex: number;
    complexFeedback: number;
}

interface ISimpleDuration {
    in: number;
    out: number;
}

interface IDuration {
    small: IComplexDuration;
    medium: ISimpleDuration;
    large: ISimpleDuration;
}

export const Duration: IDuration;

interface ISequence {
    incoming: number;
    outgoing: number;
    persistent: number;
}

export const Sequence: ISequence;

interface ICubicBezier {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}

interface IEase {
    standard: ICubicBezier;
    decelerate: ICubicBezier;
    accelerate: ICubicBezier;
}

export const Ease: IEase;

interface IElevation {
    opacity: number;
    0: svgjs.MDSBoxShadow;
    1: svgjs.MDSBoxShadow;
    2: svgjs.MDSBoxShadow;
    3: svgjs.MDSBoxShadow;
    4: svgjs.MDSBoxShadow;
    5: svgjs.MDSBoxShadow;
    6: svgjs.MDSBoxShadow;
    7: svgjs.MDSBoxShadow;
    8: svgjs.MDSBoxShadow;
    9: svgjs.MDSBoxShadow;
    10: svgjs.MDSBoxShadow;
    11: svgjs.MDSBoxShadow;
    12: svgjs.MDSBoxShadow;
    13: svgjs.MDSBoxShadow;
    14: svgjs.MDSBoxShadow;
    15: svgjs.MDSBoxShadow;
    16: svgjs.MDSBoxShadow;
    17: svgjs.MDSBoxShadow;
    18: svgjs.MDSBoxShadow;
    19: svgjs.MDSBoxShadow;
    20: svgjs.MDSBoxShadow;
    21: svgjs.MDSBoxShadow;
    22: svgjs.MDSBoxShadow;
    23: svgjs.MDSBoxShadow;
    24: svgjs.MDSBoxShadow;
}

interface IElevationMap {
    umbra: IElevation;
    penumbra: IElevation;
    ambient: IElevation;
}

export const ElevationMap: IElevationMap;


interface IRippleDuration {
    fadeIn: number;
    fadeOut: number;
    translate: number;
    wash: number;
    delay: number;
}

export const RippleDuration: IRippleDuration;

interface IStatesOpacity {
    hover: number;
    focus: number;
    press: number;
    selected: number;
    activated: number;
}
interface IRippleOpacity {
    light: IStatesOpacity;
    dark: IStatesOpacity;
}

export const RippleOpacity: IRippleOpacity;

interface IRippleRadius {
    padding: number;
    initialScale: number;
}
export const RippleRadius: IRippleRadius;