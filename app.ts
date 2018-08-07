import * as svgjs from 'svg.js';
import 'svg.filter.js';

import {
    InitialPath, GetHeight
} from './src/app-bar/app-bar-bottom';


import './src/chamferRect/chamferRect';
import './src/ripple/ripple';
import './src/elevation/elevation';


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

    // html button
    const shrineButton: HTMLElement = document.querySelector('button#shrine-button');
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

    let shrineShadow = shrineBackground.elevation(2);

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






