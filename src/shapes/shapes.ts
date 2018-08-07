/**
 * Given the hypotenuse of a isosceles triangle that is right angled, find the length of a side.
 */

export const IsoscelesRightTriangleLengthOfSide = (c: number): number => {
    // c / sqrt(2)
    return c * 0.7072;
}

export type rectCorner = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export interface vector2 {
    x: number;
    y: number;
}

export interface rect {
    x: number;
    y: number;
    width: number;
    height: number;
}

export const cutCorner = (
    point: vector2,
    length: number,
    corner: rectCorner,
    isStart: boolean = false
): string => {
    const sideLength = IsoscelesRightTriangleLengthOfSide(length);
    const start = isStart ? 'M' : 'L';

    switch(corner) {
        case 'top-left': {
            return `
            ${start} ${point.x} ${point.y + sideLength}
            L ${point.x + sideLength} ${point.y}
            `
        }
        case 'top-right': {
            return `
            ${start} ${point.x - sideLength} ${point.y}
            L ${point.x} ${point.y + sideLength}
            `
        }
        case 'bottom-right': {
            return `
            ${start} ${point.x} ${point.y - sideLength}
            L ${point.x - sideLength} ${point.y}
            `
        }
        case 'bottom-left': {
            return `
            ${start} ${point.x + sideLength} ${point.y}
            L ${point.x} ${point.y - sideLength}
            `
        }
    }
}

export const chamferRect = (r: rect, chamfer: number): string => {
    return `
        ${cutCorner({x: r.x, y: r.y}, chamfer, 'top-left', true)}
        ${cutCorner({x: r.width, y: r.y}, chamfer, 'top-right', false)}
        ${cutCorner({x: r.width, y: r.height}, chamfer, 'bottom-right', false)}
        ${cutCorner({x: r.x, y: r.height}, chamfer, 'bottom-left', false)}
        z
    `;
}