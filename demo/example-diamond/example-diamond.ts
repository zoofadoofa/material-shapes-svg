import * as svgjs from 'svg.js';
import 'svg.filter.js';
import '../../src/elevation/elevation';

export const raisedDiamond = function(element: HTMLElement): HTMLElement {
    const width = element.offsetWidth;
    const height = element.offsetHeight;

    const container: svgjs.Doc = svgjs(element).size(width, height).addClass('mds-svg');

    const diamond: svgjs.Path = container.path(`
        M${width*0.5} 0
        L${width} ${height*0.5}
        L${width*0.5} ${height}
        L0 ${height*0.5}
        Z
    `)
    .fill('#fff');

    const elevation: svgjs.Filter = diamond.elevation(8);

    return element;
}