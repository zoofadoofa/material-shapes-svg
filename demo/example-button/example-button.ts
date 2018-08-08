import * as svgjs from 'svg.js';
import 'svg.filter.js';

import '../../src/chamferRect/chamferRect';
import '../../src/ripple/ripple';
import '../../src/elevation/elevation';

export const raisedButton = function(button: HTMLElement): HTMLElement {

        const width = button.offsetWidth;
        const height = button.offsetHeight;

        const backgroundContainer: svgjs.Doc = svgjs(
            (<HTMLElement>button.getElementsByClassName('mds-background')[0])
        ).size(width, height).addClass('mds-svg');
        const washContainer: svgjs.Doc = svgjs(
            (<HTMLElement>button.getElementsByClassName('mds-wash')[0])
        ).size(width, height).addClass('mds-svg');
        const rippleContainer: svgjs.Doc = svgjs(
            (<HTMLElement>button.getElementsByClassName('mds-ripple')[0])
        ).size(width, height).addClass('mds-svg');



        const background = backgroundContainer.chamferRect(width, height, 8)
            .addClass('mds-svg-background');

        const wash = washContainer.chamferRect(width, height, 8)
            .addClass('mds-svg-wash');

        const rippleBackground = rippleContainer.chamferRect(width, height, 8)
            .addClass('mds-svg-ripple');

        const ripple = rippleBackground.ripple();

        let elevation = background.elevation(2);

        button.onmouseenter = () => {
            elevation.elevate(4);
        }

        button.onmouseleave = () => {
            elevation.elevate(2);
        }

        button.onmousedown = (event: MouseEvent) => {
            elevation.elevate(8);
            ripple.expand(event.offsetX, event.offsetY);
        }

        button.onmouseup = () => {
            elevation.elevate(4);
            ripple.reset();
        }

        button.onblur = () => {
            elevation.elevate(2);
        }

        return button;

}