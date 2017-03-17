import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {CommonModule} from "@angular/common";
import {MaterialModule} from "@angular/material";

import {
    SmdDataTable,
    SmdDatatableHeader,
    SmdDatatableActionButton,
    SmdContextualDatatableButton,
    SmdDataTableColumnComponent,
    SmdDataTableRowComponent,
    SmdDataTableCellComponent,
    SmdDatatableDialogChangeValue,
    SmdPaginatorComponent,
    SmdFabSpeedDialTrigger,
    SmdFabSpeedDialActions,
    SmdFabSpeedDialComponent,
    SmdBottomNavLabelDirective,
    SmdBottomNavGroupComponent,
    SmdBottomNavComponent,
    SmdErrorMessageComponent,
    SmdErrorMessagesComponent
} from "./component";

let COMPONENTS = [
    SmdDataTable,
    SmdDatatableHeader,
    SmdDatatableActionButton,
    SmdContextualDatatableButton,
    SmdDataTableColumnComponent,
    SmdDataTableRowComponent,
    SmdDataTableCellComponent,
    SmdDatatableDialogChangeValue,
    SmdPaginatorComponent,
    SmdFabSpeedDialTrigger,
    SmdFabSpeedDialActions,
    SmdFabSpeedDialComponent,
    SmdBottomNavLabelDirective,
    SmdBottomNavGroupComponent,
    SmdBottomNavComponent,
    SmdErrorMessageComponent,
    SmdErrorMessagesComponent
];

let IMPORTS = [
    CommonModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    MaterialModule.forRoot()
];

@NgModule({
    imports: IMPORTS,
    declarations: COMPONENTS,
    exports: COMPONENTS,
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    entryComponents: [SmdDatatableDialogChangeValue]
})
export class ComponentsModule {

    static forRoot(...imports: any[]): any[] {
        return [
            CommonModule,
            HttpModule,
            FormsModule,
            ReactiveFormsModule,
            BrowserModule,
            MaterialModule.forRoot(),
            ComponentsModule,
            ...imports
        ]
    }

}