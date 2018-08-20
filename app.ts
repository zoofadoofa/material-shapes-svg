import './src/chamferRect/chamferRect';
import './src/ripple/ripple';
import './src/elevation/elevation';
import './src/rectCutOut/rectCutOut';

import { raisedButton } from './demo/example-button/example-button';
import { raisedDiamond } from './demo/example-diamond/example-diamond';
import { exampleRipple } from './demo/example-ripple/example-ripple';
import { exampleRectCutOut } from './demo/example-rect-cutout/example-rect-cutout';

setTimeout(() => {

    const buttons = document.querySelectorAll('.shrine-button');
    buttons.forEach(button => raisedButton(<HTMLElement>button));

    const diamond: HTMLElement = document.querySelector('div.example-diamond');
    raisedDiamond(diamond);

    const ripple: HTMLElement = document.querySelector('div.example-ripple');
    exampleRipple(ripple);

    const rectCutOutElement: HTMLElement = document.querySelector('div.example-rect-cutout');
    exampleRectCutOut(rectCutOutElement);

}, 500)






