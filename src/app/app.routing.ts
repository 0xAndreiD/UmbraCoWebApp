import {ModuleWithProviders} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {ErrorComponent} from "./error/error.component";
import {RouteController} from "./services/RouteController";
import {ContentComponent} from "./content/content.component";

var appRoutes: Routes = [
  {
    path: '', component: ContentComponent, children: [{
    path: "**",
    component: ErrorComponent,
    canActivate: [RouteController]
  }], canActivate: [RouteController], canActivateChild: [RouteController]
  },
  {path: '**', component: ErrorComponent}
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
