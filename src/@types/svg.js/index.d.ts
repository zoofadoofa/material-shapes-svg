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
    }

    interface Shape {
        ripple(contrast?: MDSContrast): MDSRipple;
    }

    interface Library {
        MDSRipple: MDSRipple;
    }

    // chamferRect.ts
    export interface MDSChamferRect extends Path {
        chamfer(width: number, height: number, cut: number): this;
    }

    interface Doc {
        chamferRect(width: number, height: number, cut: number): MDSChamferRect;
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