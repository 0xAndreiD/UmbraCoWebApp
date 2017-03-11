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
          path: 'side-1',
          component: PageComponent,
          data: {
            url: 'side-1'
          }
      },
      {
          path: 'test-page-grid',
          component: PageComponent,
          data: {
            url: 'test-page-grid'
          }
      },
      {
          path: 'shops',
          component: PageComponent,
          data: {
            url: 'shops'
          }
      },
      {
          path: "**",
          redirectTo: 'error/not-found'
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
