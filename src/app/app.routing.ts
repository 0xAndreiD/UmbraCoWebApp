import {ModuleWithProviders} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {ErrorComponent} from "./components/error/error.component";
import {RouteController} from "./services/RouteController";
import {ContentComponent} from "./components/content/content.component";
import {FormComponent} from "./components/form/form.component";

var appRoutes: Routes = [
  {
    path: '', component: ContentComponent,
              children: [{
                    path: "**",
                    component: ErrorComponent,
                    canActivate: [RouteController]
               }]
              //canActivate: [RouteController],
              //canActivateChild: [RouteController]
  },
  {
    path: 'form', component: FormComponent,

  },
  {
    path: '**', component: ErrorComponent,

  }

];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
