import './polyfills.ts';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/';
import loadScript from 'load-script';
import loadStyles from 'load-styles';
import request from 'sync-request';
import Settings from './app/services/settings';

const { scripts, styles } = Settings[window.location.hostname];
for (let key in styles)
  loadStyles(request('GET', styles[key]).getBody());
for (let key in scripts)
  loadScript(scripts[key]);

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
