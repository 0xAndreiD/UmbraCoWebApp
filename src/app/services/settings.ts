import { style, animate, keyframes } from '@angular/core';
export default {
  'localhost1': {
    menu: {
      template: 'menu0',
    },
    menuItem: {
      template: 'menu0.item',
    },
    page: {
      template: 'page0',
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
  },
  'localhost2': {
    menu: {
      template: 'mmenu',
    },
    menuItem: {
      template: 'menu0.item',
    },
    page: {
      template: 'page',
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
    pageid: '1139',
    scripts: [
      '/src/app/js/mmenu/mmenujs.js'
    ],
    styles: ['/src/app/css/mmenu/mmenucss.css'],
  },
  'localhost3': {
    menu: {
      template: 'menu0',
    },
    menuItem: {
      template: 'menu0.item',
    },
    page: {
      template: 'page0',
    },
    pageid: '1883',
    scripts: [],
    styles: [
      '/src/styles.css',
    ],
  },
  'localhost': {
    menu: {
      template: 'menu-material',
      is_menutab_opened: true,
    },
    menuItem: {
      template: 'menu-material.item',
    },
    page: {
      template: 'page-material',
      animation: {
        pageSwitch: true,
        animations: [
          animate("1s", keyframes([
            //style({transform: 'translateX(-100%) scale(1)'}),
            //style({transform: 'translateX(100%) scale(1)'}),
           style({transform: 'scale(0)'}),
           style({transform: 'scale(1)'})
         ])),
          /* remove css animation on index*/
          /*animate("2s", keyframes([
            style({opacity: '1'}),
            style({opacity: '1'}),

          ]))*/
        ],
      },
    },
    footer: {
      template: 'footer-material',
    },
    pageid: '1152',
    scripts: ['/src/app/js/material/index.js'],
    styles: ['/src/app/css/material/index.css'],
  },
  'other': {
    menu: {
      template: 'menu0',
    },
    page: {
      template: 'page0',
    },
    pageid: '1803',
  }
};
