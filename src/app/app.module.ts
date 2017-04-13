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
import {MenuComponent} from "./components/menu/menu.component";
import {RouteController} from "./services/RouteController";
import {ImageLazyLoadModule, ImageLazyLoaderService, WebWorkerService} from "ng2-image-lazy-load"
import {LoadImagesService} from "./services/LoadImagesService";
import {ShopComponent} from "./components/shop/shop.component";
import {ShopItemComponent} from "./components/shop/shop.item.component";
import {CollapseModule} from 'ng2-bootstrap/collapse';
import {MaterializeModule} from "angular2-materialize";
import {DynamicComponentModule} from 'angular2-dynamic-component/index';
import { FormComponent } from './components/form/form.component';
import { CustomFormsModule } from 'ng2-validation';
import { ContentComponent } from './components/content/content.component';
import { COMPILER_PROVIDERS } from '@angular/compiler';
import { FooterComponent } from './components/footer/footer.component';
import { DynamicTypeBuilder as DynamicPageTypeBuilder } from './components/page/type.builder';
import { DynamicTypeBuilder as DynamicMenuTypeBuilder } from './components/menu/type.builder';
import { DynamicTypeBuilder as DynamicMenuItemTypeBuilder } from './components/menu/menu-item/type.builder';
import { DynamicTypeBuilder as DynamicFooterBuilder } from './components/footer/type.builder';

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
    ShopComponent,
    ShopItemComponent,
    SafeHtmlPipe,
    FormComponent,
    ContentComponent,
    FooterComponent
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
    },
    DynamicPageTypeBuilder,
    DynamicMenuTypeBuilder,
    DynamicMenuItemTypeBuilder,
    DynamicFooterBuilder,
  ],
  entryComponents: [PageComponent, ErrorComponent, AppComponent, ShopComponent],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
