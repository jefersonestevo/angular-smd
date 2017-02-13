import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {routing, appRoutingProviders} from "./app.routes";
import {AppComponent} from "./app.component";
import {ComponentsModule} from "./shared/components.module";
import {DemoDatatableView} from "./app-demo/datatable/demo-datatable";

let COMPONENTS = [
    DemoDatatableView,
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