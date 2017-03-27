import './polyfills.ts';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/';
import loadScript from 'load-script';
import loadCss from 'load-css-file';

import Settings from './app/services/settings';

const { scripts, styles } = Settings[window.location.hostname];
console.log(scripts || []);
for (let key in scripts)
  loadScript(scripts[key]);
for (let key in styles)
  loadCss(styles[key]);
console.log(Settings, window.location);

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
