import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }  from '@angular/forms';
import { HttpModule } from '@angular/http';

import { LocationStrategy, PathLocationStrategy} from '@angular/common';

import { AppComponent } from './app.component';
import { routing, appRoutingProviders }  from './app.routing';
import { HttpService }  from './services/http.service';

import { PageComponent } from './page/page.component';
import { AboutComponent }  from './about/about.component';
import { ErrorComponent } from './error/error.component';
import {SeoService} from "./services/SeoService";
import {DataParseService} from "./services/DataParseService";
import {MenuItemComponent} from "./shared/menu/menu.item.component";
import {MenuComponent} from "./shared/menu/menu.component";
import {RouteController} from "./services/RouteController";
import {ContentComponent} from "./content/content.component";

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing
  ],
  declarations: [
    AppComponent,
    PageComponent,
    AboutComponent,
    ErrorComponent,
    MenuComponent,
    MenuItemComponent,
    ContentComponent
  ],
  providers: [
    appRoutingProviders,
    {provide: LocationStrategy, useClass: PathLocationStrategy},
    HttpService,
    SeoService,
    DataParseService,
    RouteController
  ],
  entryComponents: [PageComponent, ErrorComponent, AppComponent],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
