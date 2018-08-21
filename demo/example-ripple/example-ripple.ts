import * as svgjs from 'svg.js';
import 'svg.filter.js';
import '../../src/elevation/elevation';

export const exampleRipple = function(element: HTMLElement): HTMLElement {
    const width = element.offsetWidth;
    const height = element.offsetHeight;

    const backgroundElement: HTMLElement = <HTMLElement>element.getElementsByClassName('mds-background')[0];
    const rippleElement: HTMLElement = <HTMLElement>element.getElementsByClassName('mds-ripple')[0];

    const backgroundContainer: svgjs.Doc = svgjs(backgroundElement).size(width, height).addClass('mds-svg');
    const rippleContainer: svgjs.Doc = svgjs(rippleElement).size(width, height).addClass('mds-svg');


    const chamferRect: svgjs.MDSChamferRect = backgroundContainer.chamferRect(width, height, 10)
    .fill('#ccc');
    const rippleRect: svgjs.MDSChamferRect = rippleContainer.chamferRect(width, height, 10)
    .fill('#000');

    const ripple: svgjs.MDSRipple = rippleRect.ripple('dark');

    element.onmousedown = (event: MouseEvent) => {
        ripple.expand(event.offsetX, event.offsetY);
    }
    element.onmouseup = () => {
        ripple.reset();
    }

    return element;
}