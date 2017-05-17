import {ModuleWithProviders} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {ErrorComponent} from "./components/error/error.component";
import {RouteController} from "./services/RouteController";
import {FormComponent} from "./components/form/form.component";
import {PageComponent} from "./components/page/page.component";
import {AppComponent} from "./components/app/app.component";
import {ContentComponent} from "./components/content/content.component";

var appRoutes: Routes = [
  {
    path: '',
    component: ContentComponent,
    children: [
      // {
      //   path: '',
      //   redirectTo: 'home',
      //   pathMatch: 'full'
      // },
      {
        path: ':side',
        pathMatch: 'prefix',
        component: PageComponent
      },
      {
        path: ':side/:subpage',
        component: PageComponent
      },
    ]
  },
  {
    path: '**',
    component: ErrorComponent
  }
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
