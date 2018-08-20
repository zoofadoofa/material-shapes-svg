import * as svgjs from 'svg.js';
import '../../src/rectCutOut/rectCutOut';

export const exampleRectCutOut = function(element: HTMLElement): HTMLElement {
    const width = element.offsetWidth;
    const height = element.offsetHeight;

    const svg: svgjs.Doc = svgjs(element).size(width, height).addClass('mds-svg');

    const rectCutOut = svg.circleCutOut(
        width,
        height,
        56,
        'end',
        'top',
        16,
        4,
        false
    ).fill('#6200ee');

    element.onmouseenter = (event: MouseEvent) => {
        const x = event.offsetX;

        if(x < width * 0.334) {
            console.log('start');
            rectCutOut.showCutOut('start');
        } else if (x < width * 0.667) {
            rectCutOut.showCutOut('center');
            console.log('center');
        } else {
            console.log('end');
            rectCutOut.showCutOut('end');
        }
    }

    element.onmouseleave = () => {
        rectCutOut.hideCutOut();
    }

    return element;
}