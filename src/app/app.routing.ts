import {ModuleWithProviders} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {ErrorComponent} from "./components/error/error.component";
import {RouteController} from "./services/RouteController";
import {ContentComponent} from "./components/content/content.component";
import {FormComponent} from "./components/form/form.component";
import {PageComponent} from "./components/page/page.component";
import {AppComponent} from "./components/app/app.component";

var appRoutes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: ':side',
        component: PageComponent
      },
      {
        path: ':side/:subpage',
        component: PageComponent
      },
    ]
  },
  {
    path: 'error/not-found',
    component: ErrorComponent
  },
  {
    path: '**',
    component: ErrorComponent
  }

];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
