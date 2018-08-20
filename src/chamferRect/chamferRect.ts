import * as svgjs from 'svg.js';

/**
 * Given the hypotenuse of a isosceles triangle that is right angled, find the length of a side.
 */
const isoscelesRightTriangleLengthOfSide = function(hypotenuse: number): number {
    // hypotenuse / sqrt(2)
    return hypotenuse * 0.7072;
}


type RectCorner = 'top-left' | 'top-right' | 'bottom-right' | 'bottom-left';

const cutCorner = function(
    x: number,
    y: number,
    cut: number,
    corner: RectCorner,
    isStart: boolean
): string {
    const sideLength = isoscelesRightTriangleLengthOfSide(cut);
    const start = isStart ? 'M' : 'L';

    switch(corner) {
        case 'top-left': {
            return `
            ${start} ${x} ${y + sideLength}
            L ${x + sideLength} ${y}
            `
        }
        case 'top-right': {
            return `
            ${start} ${x - sideLength} ${y}
            L ${x} ${y + sideLength}
            `
        }
        case 'bottom-right': {
            return `
            ${start} ${x} ${y - sideLength}
            L ${x - sideLength} ${y}
            `
        }
        case 'bottom-left': {
            return `
            ${start} ${x + sideLength} ${y}
            L ${x} ${y - sideLength}
            `
        }
    }
}

const MDSChamferRect = svgjs.invent({
    create: 'path',
    inherit: svgjs.Path,
    extend: {
        chamfer: function(
            width: number,
            height: number,
            cutTopLeft: number,
            cutTopRight?: number,
            cutBottomRight?: number,
            cutBottomLeft?: number
        ): svgjs.MDSChamferRect {

            const topLeft = cutTopLeft ? cutTopLeft : 0;
            const topRight = cutTopRight != null ? cutTopRight : topLeft;
            const bottomRight = cutBottomRight != null ? cutBottomRight : topLeft;
            const bottomLeft = cutBottomLeft != null ? cutBottomLeft : topLeft;

            const d = `
            ${cutCorner(0, 0, topLeft, 'top-left', true)}
            ${cutCorner(width, 0, topRight, 'top-right', false)}
            ${cutCorner(width, height, bottomRight, 'bottom-right', false)}
            ${cutCorner(0, height, bottomLeft, 'bottom-left', false)}
            `;

            return this.plot(d);
        },
    },
    construct: {
        chamferRect: function(
            width: number,
            height: number,
            cutTopLeft: number,
            cutTopRight?: number,
            cutBottomRight?: number,
            cutBottomLeft?: number
        ): svgjs.MDSChamferRect {
            return this.put(new MDSChamferRect).chamfer(
                width,
                height,
                cutTopLeft,
                cutTopRight,
                cutBottomRight,
                cutBottomLeft
            );
        }
    }
})