import { style, animate, keyframes } from '@angular/core';
export default {
  'localhost2': {
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
  'localhost1': {
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
      '/src/app/js/mmenu/mmenujs.js',
      '//cdn.jsdelivr.net/jquery.slick/1.6.0/slick.min.js'
    ],
    styles: [
      '/src/app/css/mmenu/mmenucss.css',
      '/src/app/css/htmlbuilder.css',
      '/src/app/css/customstylingtest.css'
  ],
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
          animate("1.5s", keyframes([
            style({opacity: '0'}),
            style({opacity: '0'}),
            style({opacity: '0.1'}),
            style({opacity: '0.3'}),
            style({opacity: '0.6'}),
            style({opacity: '0.8'}),
            style({opacity: '1'})
         ]))
        ],
      },
    },
    footer: {
      template: 'footer-material',
    },
    pageid: '1183',
    scripts: ['/src/app/js/material/index.js'],
    styles: ['/src/app/css/material/index.css'],
  },
  'bast.dynamikfabrikken.com': {
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
          animate("1.5s", keyframes([
            style({opacity: '0'}),
            style({opacity: '0'}),
            style({opacity: '0.1'}),
            style({opacity: '0.3'}),
            style({opacity: '0.6'}),
            style({opacity: '0.8'}),
            style({opacity: '1'})
         ]))
        ],
      },
    },
    footer: {
      template: 'footer-material',
    },
    pageid: '1183',
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
