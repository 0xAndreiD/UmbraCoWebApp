import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageComponent } from './page/page.component';
import { AboutComponent } from './about/about.component';
import { ErrorComponent } from './error/error.component';

const appRoutes: Routes = [
  { path: 'subpage-1', component: PageComponent },
  { path: 'subpage-1/nested-subpage', component: PageComponent },
  { path: 'subpage-2', component: PageComponent },
  { path: '', component: AboutComponent },
  { path: '**', component: ErrorComponent }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
