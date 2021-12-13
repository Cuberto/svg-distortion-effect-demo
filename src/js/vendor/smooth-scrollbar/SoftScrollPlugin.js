/*!
 * SmoothScrollbar SoftScroll Plugin
 * https://cuberto.com/
 *
 * @version 1.0.2
 * @author Artem Dordzhiev (Draft) | Cuberto, info@cuberto.com
 * @license Copyright 2020, Cuberto. All rights reserved.
 */

import Scrollbar from "smooth-scrollbar";

class SoftScrollPlugin extends Scrollbar.ScrollbarPlugin {
    transformDelta(delta, fromEvent) {
        const dirX = delta.x > 0 ? 1 : -1;
        const dirY = delta.y > 0 ? 1 : -1;

        if (dirX === this.lockX || dirY === this.lockY) {
            return {x: 0, y: 0};
        } else {
            this.lockX = null;
            this.lockY = null;
        }

        return delta;
    }

    onRender(Data2d) {
        const {x, y} = Data2d;

        // Up
        if (y < 0 && !this.lockY && Math.abs(y) >= this.scrollbar.scrollTop) {
            this.scrollbar.setMomentum(0, -this.scrollbar.scrollTop);
            this.lockY = -1;
        }

        // Left
        if (x < 0 && !this.lockX && Math.abs(x) >= this.scrollbar.scrollLeft) {
            this.scrollbar.setMomentum(-this.scrollbar.scrollLeft, 0);
            this.lockX = -1;
        }

        // Right
        if (x > 0 && !this.lockX && Math.abs(x) >= (this.scrollbar.limit.x - this.scrollbar.scrollLeft)) {
            this.scrollbar.setMomentum((this.scrollbar.limit.x - this.scrollbar.scrollLeft), 0);
            this.lockX = 1;
        }

        // Down
        if (y > 0 && !this.lockY && Math.abs(y) >= (this.scrollbar.limit.y - this.scrollbar.scrollTop)) {
            this.scrollbar.setMomentum(0, (this.scrollbar.limit.y - this.scrollbar.scrollTop));
            this.lockY = 1;
        }

        if(y === 0) this.lockY = null;
        if(x === 0) this.lockX = null;
    }
}

SoftScrollPlugin.pluginName = 'SoftScroll';

export default SoftScrollPlugin;
