import {ModuleWithProviders} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {APP_BASE_HREF} from "@angular/common";
import {DemoDatatable} from "./app-demo/datatable/demo-datatable";
import {DemoFabSpeedDial} from "./app-demo/fab-speed-dial/demo-fab-speed-dial";
import {DemoHomeComponent} from "./app-demo/demo.home";
import {DemoBottomNav} from "./app-demo/bottom-nav/demo-bottom-nav";

const appRoutes: Routes = [
  { path: '', redirectTo:'/demo-home', pathMatch: 'full' },
  { path: 'demo-home', component: DemoHomeComponent },
  { path: 'demo-datatable', component: DemoDatatable },
  { path: 'demo-fab-speed-dial', component: DemoFabSpeedDial },
  { path: 'demo-bottom-nav', component: DemoBottomNav }
];

export const appRoutingProviders: any[] = [
  { provide: APP_BASE_HREF, useValue: '/angular-smd' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true} );