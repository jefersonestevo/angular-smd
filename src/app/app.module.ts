import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {routing, appRoutingProviders} from "./app.routes";
import {AppComponent} from "./app.component";
import {ComponentsModule} from "./shared/components.module";
import {DemoDatatable} from "./app-demo/datatable/demo-datatable";
import {DemoHomeComponent} from "./app-demo/demo.home";
import {DemoFabSpeedDial} from "./app-demo/fab-speed-dial/demo-fab-speed-dial";
import {DemoBottomNav} from "./app-demo/bottom-nav/demo-bottom-nav";
import {DemoErrorMessages} from "./app-demo/error-messages/demo-error-messages";

let COMPONENTS = [
    DemoHomeComponent,
    DemoDatatable,
    DemoFabSpeedDial,
    DemoBottomNav,
    DemoErrorMessages,
    AppComponent
];

@NgModule({
    imports: ComponentsModule.forRoot(routing),
    declarations: COMPONENTS,
    providers: [appRoutingProviders],
    bootstrap: [AppComponent],
    schemas : [CUSTOM_ELEMENTS_SCHEMA],
    entryComponents: []
})
export class AppModule {
}