//Remove after updating to Typescript 2.1 and set --importHelpers into tsconfig
import "ts-helpers"
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {LocationStrategy, PathLocationStrategy} from "@angular/common";
import {AppComponent} from "./components/app/app.component";
import {routing, appRoutingProviders} from "./app.routing";
import {HttpService} from "./services/http.service";
import {SafeHtmlPipe} from "./components/page/page.component";
import {PageComponent} from "./components/page/page.component";
import {ErrorComponent} from "./components/error/error.component";
import {SeoService} from "./services/SeoService";
import {DataParseService} from "./services/DataParseService";
import {MenuItemComponent} from "./components/menu/menu-item/menu.item.component";
import {MenuSearchComponent} from "./components/menu/menu-search/menu.search.component";
import {MenuComponent} from "./components/menu/menu.component";
import {RouteController} from "./services/RouteController";
//import {ContentComponent} from "./components/content/content.component";
import {ImageLazyLoadModule, ImageLazyLoaderService, WebWorkerService} from "ng2-image-lazy-load"
import {LoadImagesService} from "./services/LoadImagesService";
import {ShopComponent} from "./components/shop/shop.component";
import {ShopItemComponent} from "./components/shop/shop.item.component";
import {CollapseModule} from 'ng2-bootstrap/collapse';
import {MaterializeModule} from "angular2-materialize";
import {DynamicComponentModule} from 'angular2-dynamic-component/index';
import { FormComponent } from './components/form/form.component';
import { CustomFormsModule } from 'ng2-validation'

WebWorkerService.enabled=false;
@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    // ImageLazyLoadModule,
    CustomFormsModule,
    CollapseModule,
    MaterializeModule,
    DynamicComponentModule,
    routing
  ],
  declarations: [
    AppComponent,
    PageComponent,
    ErrorComponent,
    MenuComponent,
    MenuItemComponent,
    MenuSearchComponent,
//    ContentComponent,
    ShopComponent,
    ShopItemComponent,
    SafeHtmlPipe,
    FormComponent
  ],
  providers: [
    appRoutingProviders,
    {provide: LocationStrategy, useClass: PathLocationStrategy},
    HttpService,
    SeoService,
    DataParseService,
    RouteController,
    {
      provide: ImageLazyLoaderService,
      useClass: LoadImagesService
    }
  ],
  entryComponents: [PageComponent, ErrorComponent, AppComponent, ShopComponent],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
