import * as svgjs from 'svg.js';
import 'svg.filter.js';

import {
    InitialPath, GetHeight
} from './src/app-bar/app-bar-bottom';


import './src/chamferRect/chamferRect';
import './src/ripple/ripple';
import './src/elevation/elevation';

import { raisedButton } from './demo/example-button/example-button';
import { raisedDiamond } from './demo/example-diamond/example-diamond';
import { exampleRipple } from './demo/example-ripple/example-ripple';


const toolbar1: HTMLElement = document.querySelector('div#toolbar1');
const toolbar2: HTMLElement = document.querySelector('div#toolbar2');
const width1 = toolbar1.clientWidth;
const width2 = toolbar2.clientWidth;
const draw1 = svgjs('toolbar1-background').size(width1, GetHeight());
const draw2 = svgjs('toolbar2-background').size(width2, GetHeight());
draw1.path(InitialPath('expanded', 'center', width1))
.addClass('tmdc-app-bar-bottom-path');
draw2.path(InitialPath('expanded', 'end', width2))
.addClass('tmdc-app-bar-bottom-path');

setTimeout(() => {

    const buttons = document.querySelectorAll('.shrine-button');
    buttons.forEach(button => raisedButton(<HTMLElement>button));

    const diamond: HTMLElement = document.querySelector('div.example-diamond');
    raisedDiamond(diamond);

    const ripple: HTMLElement = document.querySelector('div.example-ripple');
    exampleRipple(ripple);


}, 500)






