import * as svgjs from 'svg.js';
import 'svg.filter.js';

import './src/chamferRect/chamferRect';
import './src/ripple/ripple';
import './src/elevation/elevation';

import { raisedButton } from './demo/example-button/example-button';
import { raisedDiamond } from './demo/example-diamond/example-diamond';
import { exampleRipple } from './demo/example-ripple/example-ripple';

setTimeout(() => {

    const buttons = document.querySelectorAll('.shrine-button');
    buttons.forEach(button => raisedButton(<HTMLElement>button));

    const diamond: HTMLElement = document.querySelector('div.example-diamond');
    raisedDiamond(diamond);

    const ripple: HTMLElement = document.querySelector('div.example-ripple');
    exampleRipple(ripple);


}, 500)






