import gsap from 'gsap';

const svgFilter = document.querySelector('#svg-distortion-filter');
const svgFilterTurbulence= svgFilter.querySelector('feTurbulence');
const svgFilterDisplacementMap = svgFilter.querySelector('feDisplacementMap');

const bgs = document.querySelector('.cb-demo-bgs');
const bg = bgs.querySelectorAll('.cb-demo-bg');
const figures = document.querySelector('.cb-demo-figures');
const figure = figures.querySelectorAll('.cb-demo-figure');
const navs = document.querySelector('.cb-demo-navs');
const nav = navs.querySelectorAll('.cb-demo-nav');

let lastActiveItem = 0;

// Toggle active item by index
const setActiveItem = (index) => {
    if(lastActiveItem === index) return true;

    figure.forEach((el, i) => {
        el.classList.toggle('-active', index === i); // set active nav item
        bg[i].classList.toggle('-active', index === i); // set active bg
        nav[i].classList.toggle('-active', index === i); // set active figure
    });

    makeDisplace();

    lastActiveItem = index;
};

const makeDisplace = () => {
    const tl = gsap.timeline();

    // Kill all previous tweens of displacement map
    gsap.killTweensOf(svgFilterDisplacementMap);

    // Set random seed of turbulence
    tl.set(svgFilterTurbulence, {
        attr: {seed: gsap.utils.random(2, 150)},
    }, 0);

    // Scale displacement map to random value
    tl.to(svgFilterDisplacementMap, {
        attr: {scale: gsap.utils.random(80, 120)},
        duration: 0.2,
    }, 0);

    // Scale back displacement map to initial value
    tl.to(svgFilterDisplacementMap, {
        attr: {scale: 1},
        duration: 1.2,
        ease: "expo.out"
    }, 0.2);
};

// Add event to navigation items
nav.forEach((el, index) => {
    el.addEventListener('mouseenter', function () {
        setActiveItem(index);
    });
});

// Add empty click event listener to document for enable `mouseenter` event on mobile devices
document.addEventListener('click', () => {});

