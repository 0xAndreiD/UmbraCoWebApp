import {ModuleWithProviders} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {ErrorComponent} from "./components/error/error.component";
import {RouteController} from "./services/RouteController";
import {ContentComponent} from "./components/content/content.component";
import {FormComponent} from "./components/form/form.component";
import {PageComponent} from "./components/page/page.component";

var appRoutes: Routes = [
  {
    path: '', 
    component: ContentComponent,
    children: [
      {
          path: '',
          redirectTo: 'side-1'
      },
      {
          path: ":url",
          component: PageComponent
      }
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
