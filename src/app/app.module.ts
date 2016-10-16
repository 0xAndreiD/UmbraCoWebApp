import { NgModule }       from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { LocationStrategy, HashLocationStrategy, PathLocationStrategy} from '@angular/common';

import { AppComponent }         from './app.component';
import { routing, appRoutingProviders }  from './app.routing';
import { HttpService }  from './http.service';

import { PageComponent }    from './page/page.component';
import { AboutComponent }  from './about/about.component';
import { ErrorComponent } from './error/error.component';

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
    ErrorComponent
  ],
  providers: [
    appRoutingProviders, 
    {provide: LocationStrategy, useClass: PathLocationStrategy},
    HttpService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
