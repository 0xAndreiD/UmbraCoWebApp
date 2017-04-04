import { style, animate, keyframes } from '@angular/core';
export default {
  'localhost': {
    menu: 'menu0',
    menuItem: 'menu0.item',
    page: 'page0',
    pageid: '1152',
    scripts: [
      '/src/app/js/paperstack/modernizr-custom.js',
      '/src/app/js/paperstack/classie.js',
      '/src/app/js/paperstack/main.js',
    ],
    styles: [
      '/src/app/css/paperstack/paperstackcss.css',
      '/src/styles.css',
    ],
    animation: {
      pageSwitch: false,
      animations: [
        animate("2s", keyframes([
          //style({transform: 'translateX(-100%) scale(1)'}),
          //style({transform: 'translateX(100%) scale(1)'}),

         style({transform: 'scale(0)'}),
         style({transform: 'scale(1)'}),
       ])),
        /* remove css animation on index*/
        /*animate("2s", keyframes([
          style({opacity: '1'}),
          style({opacity: '1'}),

        ]))*/
      ],
    },
  },
  'localhost1': {
    menu: 'mmenu',
    menuItem: 'menu0.item',
    page: 'page',
    pageid: '1139',
    scripts: ['/src/app/js/mmenu/mmenujs.js'],
    styles: ['/src/app/css/mmenu/mmenucss.css'],
    animation: {
      pageSwitch: true,
      animations: [
        animate("2s", keyframes([
          //style({transform: 'translateX(-100%) scale(1)'}),
          //style({transform: 'translateX(100%) scale(1)'}),
         style({transform: 'scale(0)'}),
         style({transform: 'scale(0.4)'}),
         style({transform: 'scale(0.3)'}),
         style({transform: 'scale(0.4)'}),
         style({transform: 'scale(0.3)'}),
         style({transform: 'scale(0.4)'}),
         style({transform: 'scale(0.3)'}),
         style({transform: 'scale(1)'}),
       ])),
        /* remove css animation on index*/
        /*animate("2s", keyframes([
          style({opacity: '1'}),
          style({opacity: '1'}),

        ]))*/
      ],
    },
  },
  'localhost2': {
    menu: 'menu0',
    menuItem: 'menu0.item',
    page: 'page0',
    pageid: '1883',
    scripts: [],
    styles: [
      '/src/styles.css',
    ],
  },
  'other': {
    menu: 'menu0',
    page: 'page0',
    pageid: '1803',
  }
};
