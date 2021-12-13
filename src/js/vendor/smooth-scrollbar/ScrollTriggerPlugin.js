/*!
 * SmoothScrollbar GSAP ScrollTrigger Plugin
 *
 * @version 1.0.1
 * @author Artem Dordzhiev (Draft)
 */

import Scrollbar from "smooth-scrollbar";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

class ScrollTriggerPlugin extends Scrollbar.ScrollbarPlugin {
    constructor(scrollbar, options) {
        super(scrollbar, options);
        this.setProxy();
    }

    setProxy() {
        const scrollbar = this.scrollbar;

        ScrollTrigger.scrollerProxy(document.body, {
            scrollTop(value) {
                if (arguments.length) {
                    scrollbar.scrollTop = value; // setter
                }
                return scrollbar.scrollTop;    // getter
            },
            getBoundingClientRect() {
                return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
            },
            pinType: "transform"
        });

        scrollbar.addListener(ScrollTrigger.update);
    }
}

ScrollTriggerPlugin.pluginName = 'ScrollTrigger';

export default ScrollTriggerPlugin;
