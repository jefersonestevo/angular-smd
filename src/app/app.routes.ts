import {ModuleWithProviders} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {APP_BASE_HREF} from "@angular/common";
import {DemoDatatableView} from "./app-demo/datatable/demo-datatable";

const appRoutes: Routes = [
  { path: '', redirectTo:'/demo-datatable', pathMatch: 'full' },
  { path:'demo-datatable', component: DemoDatatableView }
];

export const appRoutingProviders: any[] = [
  { provide: APP_BASE_HREF, useValue: '/angular-smd' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true} );