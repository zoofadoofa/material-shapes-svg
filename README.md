# Material Shapes Svg

An implementation of [Material Design Shape](https://material.io/design/shape/about-shape.html) for the web extending [Svg.js](http://svgjs.com/) and [Svg.filter.js](https://github.com/svgdotjs/svg.filter.js)

## Install

```bash
npm install material-shapes-svg
```

## Shapes

### `Chamfer Rectangle`
Creates a rectangle with cut corners. ![](https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1D3gHt8IEzInmjBkQOYnztlziEtEOOkhm%2Fbutton-shrine-shape.png)

**`svgjs.Doc.chamferRect(`**<br/>
**width**:
number,<br/>
**height**:
number,<br/>
**chamferAllLength**:
number,<br/>
**`)`**:
**svgjs.MDSChamferRect**

**`svgjs.Doc.chamferRect(`**<br/>
**width**:
number,<br/>
**height**:
number,<br/>
**chamferTopLeftLength**:
number,<br/>
**chamferTopRightLength**:
number,<br/>
**chamferBottomRightLength**:
number,<br/>
**chamferBottomLeftLength**:
number<br/>
**`)`**:
**svgjs.MDSChamferRect**

Change the chamfer length later after the ChamferRect has been created using the chamfer method

**`svgjs.MDSChamferRect.chamfer(`**<br/>
**width**:
number,<br/>
**height**:
number,<br/>
**chamferAllLength**:
number,<br/>
**`)`**:
**svgjs.MDSChamferRect**

**`svgjs.MDSChamferRect.chamfer(`**<br/>
**width**:
number,<br/>
**height**:
number,<br/>
**chamferTopLeftLength**:
number,<br/>
**chamferTopRightLength**:
number,<br/>
**chamferBottomRightLength**:
number,<br/>
**chamferBottomLeftLength**:
number<br/>
**`)`**:
**svgjs.MDSChamferRect**

*`svgjs.MDSChamferRect`* extends *`svgjs.Path`*

```html
<!-- HTML -->
<div class="example-chamfer"></div>
```
```css
/* CSS: for size example */
.example-chamfer {
    width: 160px;
    height: 40px;
}
```

```typescript
import * as svgjs from 'svg.js';
import 'material-shapes-svg';

// Find example div
const div: HTMLElement = document.querySelector('div.example-chamfer');
const width: number = div.offsetWidth;
const height: number = div.offsetHeight;
const chamferLength: number = 8;

// Create container
const container: svgjs.Doc = svgjs(div).size(width, height);

// Draw the chamfer rectangle
container.chamferRect(width, height, chamferLength);
```

### `Elevation`
Creates a [Material Elevation](https://material.io/design/environment/elevation.html) based on the shape.
![](https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1FjW7ZT_MD39eQlLf2hy_hKwCvXmRe4qo%2Fshadowprinciples-do-1.png)

**`svgjs.Shape.elevation(`**
**z**:
svgjs.zDepth
**`)`**:
**svgjs.Filter**

**`svgjs.Filter.elevate(`**
**z**:
svgjs.zDepth
**`)`**:
**svgjs.Filter**

```html
<!-- HTML -->
<div class="example-diamond"></div>
```

```css
/* CSS: Make sure shadows dont get clipped */
.example-diamond .mds-svg {
    overflow: visible;
}

.example-diamond {
    width: 64px;
    height: 64px;
}
```

```typescript
import * as svgjs from 'svg.js';
import 'svg.filter.js';
import 'material-shapes-svg';

// find example div
const div: HTMLElement = document.querySelector('div.example-diamond');
const width = element.offsetWidth;
const height = element.offsetHeight;

const container: svgjs.Doc = svgjs(element).size(width, height).addClass('mds-svg');

// Diamond Shape
const diamond: svgjs.Path = container.path(`
    M${width*0.5} 0
    L${width} ${height*0.5}
    L${width*0.5} ${height}
    L0 ${height*0.5}
    Z
`).fill('#fff');

const elevation: svgjs.Filter = diamond.elevation(8);
```

### `Ripple`
Creates a [Material Pressed State](https://material.io/design/interaction/states.html#pressed) aka `ripple`
![](https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F0B9msDEx00QXmVVlCempEWTlRVkU%2Fpressed-02.png)

**`svgjs.Shape.ripple(`**
**contrast?**:
svgjs.MDSContrast
**`)`**:
**svgjs.MDSRipple**

**`svgjs.MDSRipple.expand(`**
**x**:
number,
**y**:
number
**`)`**:
**svgjs.MDSRipple**

**`svgjs.MDSRipple.reset()`**:
**svgjs.MDSRipple**

If you need to update the extents of the ripple use updateMinMax, such as parent container resized.

**`svgjs.MDSRipple.updateMinMax(`**
**width**:
number,
**height**:
number
**`)`**:
**svgjs.MDSRipple**

**`svgjs.MDSRipple.contrast`**: svgjs.MDSContrast ( **`'light'`** | **`'dark'`** )

*`svgjs.MDSRipple`* extends *`svgjs.Circle`*

```html
<!-- HTML -->
<div class="example-ripple">
    <div class="mds-background"></div>
    <div class="example-text">Click me</div>
    <div class="mds-ripple"></div>
</div>
```

```css
/* CSS */
.example-ripple {
    width: 160px;
    height: 36px;
    position: relative;
}
.example-ripple .mds-background,
.example-ripple .mds-wash,
.example-ripple .mds-ripple {
    position: absolute;
    overflow: visible;
    top: 0;
    left: 0;
}

.example-ripple .example-text {
    line-height: 36px;
    height: 36px;
    color: #222;
    position: relative;
    text-align: center;
}
```

```typescript
import * as svgjs from 'svg.js';
import 'material-shapes-svg';

// Find example div
const div: HTMLElement = document.querySelector('div.example-diamond');
const width = div.offsetWidth;
const height = div.offsetHeight;

// Find background div
const backgroundElement: HTMLElement = <HTMLElement>div.getElementsByClassName('mds-background')[0];

// Find ripple div
const rippleElement: HTMLElement = <HTMLElement>div.getElementsByClassName('mds-ripple')[0];

// Create containers
const backgroundContainer: svgjs.Doc = svgjs(backgroundElement).size(width, height).addClass('mds-svg');
const rippleContainer: svgjs.Doc = svgjs(rippleElement).size(width, height).addClass('mds-svg');

// Draw a shape that can show off mask effect
const chamferRect: svgjs.MDSChamferRect = backgroundContainer.chamferRect(width, height, 10)
.fill('#ccc');
// You need a separate copy of shape for ripple
const rippleRect: svgjs.MDSChamferRect = rippleContainer.chamferRect(width, height, 10)
.fill('#000');

// Add ripple shape
const ripple: svgjs.MDSRipple = rippleRect.ripple('dark');

// Add interactions for demo
div.onmousedown = (event: MouseEvent) => {
    ripple.expand(event.offsetX, event.offsetY);
}
div.onmouseup = () => {
    ripple.reset();
}
```

### Rect Cut Out
Creates cut outs for rectangles. Such as [Material App Bottom Bar](https://material.io/design/components/app-bars-bottom.html). See the Inset FAB under the anatomy section.
![](https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1xkb-3HQEAsb0IA292GLCziMMh6QE1YIX%2Fanatomy-fab-cut.png)

**`svgjs.Shape.circleCutOut(`**<br/>
**width**:
number,<br/>
**height**:
number,<br/>
**cutOutSize**:
number,<br/>
**alignX**:
svgjs.CutOutAlignX,<br/>
**alignY**:
svgjs.CutOutAlignY,<br/>
**padding**:
number,<br/>
**roundedEdge**:
number,<br/>
**showCutOut**:
boolean<br/>
**`)`**:
**svgjs.MDSRectCutOut**

**`svgjs.Shape.triangleCutOut(`**<br/>
**width**:
number,<br/>
**height**:
number,<br/>
**cutOutSize**:
number,<br/>
**alignX**:
svgjs.CutOutAlignX,<br/>
**alignY**:
svgjs.CutOutAlignY,<br/>
**padding**:
number,<br/>
**showCutOut**:
boolean<br/>
**`)`**:
**svgjs.MDSRectCutOut**

**`svgjs.Shape.customCutOut(`**<br/>
**width**:
number, `// Width of rect`<br/>
**height**:
number, `// Height of rect`<br/>
**cutOutSize**:
number, `// Size of cutout`<br/>
**customCutOutOpen**:
string, `// Relative svg.path data`<br/>
**customCutOutClosed**:
string, `// Relative svg.path data`<br/>
**alignX**:
svgjs.CutOutAlignX,<br/>
**alignY**:
svgjs.CutOutAlignY,<br/>
**padding**:
number,<br/>
**showCutOut**:
boolean<br/>
**`)`**:
**svgjs.MDSRectCutOut**

**`svgjs.MDSRectCutOut.showCutOut(`**
**alignX**:
svgjs.CutOutAlignX
**`)`**:
**svgjs.MDSRectCutOut**

**`svgjs.MDSRectCutOut.hideCutOut()`**:
**svgjs.MDSRectCutOut**

If you need to update the extents of the Rect use resize, such as parent container resized.

**`svgjs.MDSRectCutOut.resize(`**
**width**:
number,<br/>
**height**:
number<br/>
**`)`**:
**svgjs.MDSRectCutOut**

**`svgjs.MDSRectCutOut.CutOutAlignX`**: svgjs.CutOutAlignX ( **`'start'`** | **`'center'`** | **`'end'`** )

**`svgjs.MDSRectCutOut.CutOutAlignY`**: svgjs.CutOutAlignX ( **`'top'`** | **`'bottom'`** )

*`svgjs.MDSRectCutOut`* extends *`svgjs.Path`*

```html
<!-- HTML -->
<div class="example-rect-cutout"></div>
```
```css
/* CSS: for size example */
.example-rect-cutout {
    width: 100%;
    height: 56px;
}
```

```typescript
import * as svgjs from 'svg.js';
import 'material-shapes-svg';

// Find example div
const div: HTMLElement = document.querySelector('div.example-rect-cutout');
const width: number = div.offsetWidth;
const height: number = div.offsetHeight;
const padding: number = 16;
const roundedEdge: number = 4;
const fabDiameter: number = 56 + 16; // fab plus cutout padding
const cutOutAlignX = 'end';
const cutOutAlignY = 'top';
const showCutOut = true;

// Create container
const container: svgjs.Doc = svgjs(div).size(width, height);

// Draw the rectangle with circular cutout
const rectCutOut: svgjs.MDSRectCutOut = container.circleCutOut(
    width,
    height,
    fabDiameter,
    cutOutAlignX,
    cutOutAlignY,
    padding,
    roundedEdge,
    showCutOut
);
```

For custom shapes use relative path data
```typescript
const cutOutSize = 80;

const radius = `28 28`
const concave = `0 0 0`

const openCutOut = `
a ${radius} ${concave} 14 21
a ${radius} ${concave} 52 0
a ${radius} ${concave} 14 -21
l 0 0`;

const closedCutOut = `
a 23 0 ${concave} 0 0
a 24 0 ${concave} 0 0
a 23 0 ${concave} 0 0
l 0 0`;

const rectCutOut: svgjs.MDSRectCutOut = container.customCutOut(
    width,
    height,
    cutOutSize,
    openCutOut,
    closedCutOut,
    cutOutAlignX,
    cutOutAlignY,
    padding,
    showCutOut
)
```

## RoadMap
**`Rectangle With Custom Cutout`** supply relative path data for custom shape cutout.

**`Custom Chamfer Shapes`** supply a shape to cutout of chamfered corners

**`Demo Site`** for more interactive examples