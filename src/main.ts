import './polyfills.ts';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/';
import loadScript from 'load-script';
import loadCss from 'load-css-file';
import Settings from './app/services/settings';

const { scripts, styles } = Settings[window.location.hostname];
for (let key in styles)
  loadCss(styles[key]);
for (let key in scripts)
  loadScript(scripts[key]);

if (environment.production) {
  enableProdMode();
}

setTimeout(() => platformBrowserDynamic().bootstrapModule(AppModule), 500);
