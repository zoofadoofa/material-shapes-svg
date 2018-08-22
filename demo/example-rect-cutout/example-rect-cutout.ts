import * as svgjs from 'svg.js';
import '../../src/rectCutOut/rectCutOut';

export const exampleRectCutOut = function(element: HTMLElement): HTMLElement {
    const width = element.offsetWidth;
    const height = element.offsetHeight;

    const svg: svgjs.Doc = svgjs(element).size(width, height).addClass('mds-svg');

    const rectCutOut = svg.circleCutOut(
        width,
        height,
        64,
        'end',
        'top',
        24,
        4,
        true
    ).fill('#6200ee');

    const elevation = rectCutOut.elevation(16);

    let alignment: svgjs.CutOutAlignX;


    element.onmousedown = (event: MouseEvent) => {
        const x = event.offsetX;
        let alignX: svgjs.CutOutAlignX;

        if(x < width * 0.334) {
            alignX = 'start';
        } else if (x < width * 0.667) {
            alignX = 'center';
        } else {
            alignX = 'end';
        }

        alignment = alignX;
        rectCutOut.showCutOut(alignX);
    }

    element.onmouseleave = () => {
        rectCutOut.hideCutOut();
    }

    return element;
}