import * as svgjs from 'svg.js';
import 'svg.filter.js';

import * as matShapesSvg from './src/chamferRect/chamferRect';

// import { MDCRipple } from '@material/ripple';
import {
    CutoutExpand, CutoutCollapse, InitialPath, GetHeight
} from './src/app-bar/app-bar-bottom';


import { Duration, Ease } from './src/animation/animation.const';
import * as BezierEasing from 'bezier-easing';

import './src/chamferRect/chamferRect';
import './src/ripple/ripple';

import './src/elevation/elevation';
import { rippleOpacity, rippleDuration, rippleRadius } from './src/ripple/ripple.const';

// const buttons = document.querySelectorAll('.mdc-button');
// const ripple = buttons.forEach(button => new MDCRipple(button) );
// const iconButtons = document.querySelectorAll('.mdc-icon-button');
// const iconRipple = iconButtons.forEach(icon => new MDCRipple(icon).unbounded = true);
// const fabCenterRipple = new MDCRipple(document.querySelector('.material-fab-center'));
// const fabEndRipple = new MDCRipple(document.querySelector('.material-fab-end'));
const toolbar1: HTMLElement = document.querySelector('div#toolbar1');
const toolbar2: HTMLElement = document.querySelector('div#toolbar2');
const width1 = toolbar1.clientWidth;
const width2 = toolbar2.clientWidth;
const draw1 = svgjs('toolbar1-background').size(width1, GetHeight());
const draw2 = svgjs('toolbar2-background').size(width2, GetHeight());
const path1 = draw1.path(InitialPath('expanded', 'center', width1))
.addClass('tmdc-app-bar-bottom-path');
const path2 = draw2.path(InitialPath('expanded', 'end', width2))
.addClass('tmdc-app-bar-bottom-path');

setTimeout(() => {

    // html button
    const shrineButton: HTMLElement = document.querySelector('button#shrine-button');
    const shrineButtonRect = shrineButton.getBoundingClientRect();
    const shrineMaxDiameter = Math.max(shrineButtonRect.height, shrineButtonRect.width);
    const shrineInitialSize = shrineMaxDiameter * rippleRadius.initialScale;
    const shrineWidth = shrineButton.offsetWidth;
    const backgroundContainer = svgjs('shrine-button-svg-background')
        .size(shrineWidth, 36)
        .addClass('shrine-button-svg-background');
    const washContainer = svgjs('shrine-button-svg-overlay')
        .size(shrineWidth, 36)
        .addClass('shrine-button-svg-overlay');
    const rippleContainer = svgjs('shrine-button-svg-ripple')
        .size(shrineWidth, 36)
        .addClass('shrine-button-svg-ripple');


    const shrineBackground = backgroundContainer.chamferRect(shrineWidth, 36, 8)
        .addClass('shrine-button-background');

    const shrineOverlay = washContainer.chamferRect(shrineWidth, 36, 8)
        .addClass('shrine-button-overlay');


    const shrineRipple = rippleContainer.chamferRect(shrineWidth, 36, 8)
        .addClass('shrine-button-ripple');
    const ripple = shrineRipple.ripple();

    // let shrineFilter;
    // shrineBackground.filter((add: any) => {
    //     shrineFilter = add;
    //     return elevate(add, 2);
    // });

    let shrineShadow = shrineBackground.matShadow(2);

    shrineButton.onmouseenter = () => {
        shrineShadow.elevate(4);
    }

    shrineButton.onmouseleave = () => {
        shrineShadow.elevate(2);
    }

    shrineButton.onmousedown = (event: MouseEvent) => {
        shrineShadow.elevate(8);
        ripple.expand(event.offsetX, event.offsetY);
    }

    shrineButton.onmouseup = () => {
        shrineShadow.elevate(4);
        ripple.reset();
    }

    shrineButton.onfocus = () => {
        // hasFocus = true;
    }

    shrineButton.onblur = () => {
        shrineShadow.elevate(2);
    }
}, 500)

// toolbar1.onmouseenter = () => {
//     CutoutCollapse(path1, 'center', width1);
// };

// toolbar1.onmouseleave = () => {
//     CutoutExpand(path1, 'center', width1)
// }

// toolbar2.onmouseenter = () => {
//     CutoutCollapse(path2, 'end', width2);
// };

// toolbar2.onmouseleave = () => {
//     CutoutExpand(path2, 'end', width2)
// }






