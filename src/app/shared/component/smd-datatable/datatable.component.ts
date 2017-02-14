import {
    Component,
    Directive,
    ViewEncapsulation,
    Input,
    Output,
    Inject,
    forwardRef,
    EventEmitter,
    DoCheck,
    IterableDiffers,
    ViewChild,
    ContentChild,
    ContentChildren,
    QueryList,
    EmbeddedViewRef,
    TemplateRef,
    ViewContainerRef,
    ElementRef,
    AfterContentInit,
    OnInit,
    OnDestroy,
    ChangeDetectorRef
} from "@angular/core";
import {isNullOrUndefined} from "util";
import {SmdPaginatorComponent} from "../smd-paginator/paginator.component";
import {Subscription} from "rxjs/Subscription";
import {MdDialogRef, MdDialog, MdDialogConfig} from '@angular/material';

let columnIds = 0;

export class SmdDataRowModel {
    originalOrder?: number;

    constructor(public model: any,
                public checked?: boolean) {
    }
}

@Component({
    selector: "smd-change-value-dialog",
    template: `
        <h1 *ngIf="title" md-dialog-title>{{title}}</h1>
        <md-dialog-content>
            <md-input-container>
                <input type="text" md-input [placeholder]="placeholder" [(ngModel)]="value">
            </md-input-container>
        </md-dialog-content>
        <md-dialog-actions>
            <button type="button" md-button (click)="_cancel()">Cancel</button>
            <button type="button" md-button (click)="_save()">Save</button>
        </md-dialog-actions>
    `,
    styles: [`
        * {
            font-family: Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif;        
        }
        
        md-dialog-actions {
            float: right;
        }
        
        md-dialog-content {
            min-width: 150px;
            padding: 5px 30px;
        }
    `]
})
export class SmdDatatableDialogChangeValue {

    public title: string;
    public placeholder: string;
    public value: string;

    constructor(public dialogRef: MdDialogRef<SmdDatatableDialogChangeValue>) {
    }

    _save() {
        this.dialogRef.close(this.value);
    }

    _cancel() {
        this.dialogRef.close();
    }
}

@Directive({
    selector: '[smd-data-cell]'
})
export class SmdDataTableCellComponent implements OnInit, OnDestroy {
    @Input() column: SmdDataTableColumnComponent;
    @Input() data: any;
    @Input() templ: TemplateRef<SmdDataTableCellComponent>;

    childView: EmbeddedViewRef<SmdDataTableCellComponent>;

    constructor(private _viewContainer: ViewContainerRef, private _elementRef: ElementRef) { }

    ngOnInit(): void {
        if (this._viewContainer && this.templ) {
            this.childView = this._viewContainer.createEmbeddedView(this.templ, this);
        }
    }

    ngOnDestroy(): void {
        this.childView.destroy();
    }
}

@Component({
    selector: "[smd-datatable-row]",
    template: `
        <td *ngIf="renderCheckbox" class="smd-datatable-body-checkbox">
            <div class="smd-checkbox">
                <md-checkbox [(ngModel)]="row.checked" (change)="_parent._onRowCheckChange(row)">
                </md-checkbox>
            </div>
        </td>
        <td *ngFor="let column of columns"
            [class.smd-numeric-column]="column.numeric"
            [class.smd-editable]="column.editable"
            (click)="_onClick(column, row.model)">
            <span class="smd-column-title">
                {{column.title}}
            </span>
            <span class="smd-cell-data">
                <template smd-data-cell [column]="column" [data]="row.model" [templ]="column.template"></template>
                <span class="smd-editable-field-placeholder" *ngIf="column.editable && !row.model[column.field]">{{column.editablePlaceholder}}</span>
            </span>
        </td>
    `
})
export class SmdDataTableRowComponent {
    @Input() row: SmdDataRowModel;
    @Input() renderCheckbox: boolean;
    @Input() columns: SmdDataTableColumnComponent[];

    constructor(@Inject(forwardRef(() => SmdDataTable)) private _parent: SmdDataTable, private dialog: MdDialog, private viewContainerRef: ViewContainerRef) {
    }

    _onClick(column: SmdDataTableColumnComponent, model: any) {
        if (column.editable) {
            let dialogRef: MdDialogRef<SmdDatatableDialogChangeValue>;
            let dialogConfig = new MdDialogConfig();
            dialogConfig.viewContainerRef = this.viewContainerRef;

            dialogRef = this.dialog.open(SmdDatatableDialogChangeValue, dialogConfig);

            dialogRef.componentInstance.title = column.editablePlaceholder;
            dialogRef.componentInstance.placeholder = column.title;
            dialogRef.componentInstance.value = model[column.field];

            dialogRef.afterClosed().subscribe((result) => {
                if (result !== 'undefined') {
                    model[column.field] = result;
                }
            });
        }
    }

}

@Component({
    selector: "smd-datatable-column",
    template: `
        <ng-content select="template"></ng-content>
        <template #internalTemplate *ngIf="!_template" let-model="data">
            {{getFieldValue(model)}}
        </template>
    `
})
export class SmdDataTableColumnComponent implements OnInit {
    sortDir?: 'asc' | 'desc' = null;
    id: string = '' + ++columnIds;

    @Input() title: string;
    @Input() titleTooltip: string;
    @Input() field: string;
    @Input() numeric: boolean = false;
    @Input() sortable: boolean = false;
    @Input() sortFn: (a:any, b:any, sortDir: string) => number;
    @Input() filterFn: (a:any, text: string) => boolean;
    @Input() editable: boolean = false;
    @Input() editablePlaceholder: string;

    @ContentChild(TemplateRef) _customTemplate: TemplateRef<Object>;
    @ViewChild('internalTemplate') _internalTemplate: TemplateRef<Object>;

    get template() {
        return this._customTemplate ? this._customTemplate : this._internalTemplate;
    }

    get hasCustomTemplate():boolean {
        return !!this._customTemplate;
    }

    constructor(private _viewContainer: ViewContainerRef, private elementRef: ElementRef) {
    }

    ngOnInit(): void {
        if (!this.title) {
            throw new Error('Title is mandatory on smd-datatable-column');
        }
        if (!this.field) {
            throw new Error('Field is mandatory on smd-datatable-column');
        }
    }

    getFieldValue(model: any) {
        return model[this.field];
    }
}

@Component({
    selector: "smd-datatable-action-button",
    template: `
        <button md-button
                color="primary"
                *ngIf="_checkButtonIsVisible()"
                (click)="_onButtonClick($event)">
            <span>{{label}}</span>
        </button>
    `
})
export class SmdDatatableActionButton {
    @Input() label: string;
    @Output() onClick: EventEmitter<void> = new EventEmitter<void>();

    constructor(@Inject(forwardRef(() => SmdDataTable)) private _parent: SmdDataTable) {
    }

    _onButtonClick(event: Event) {
        this.onClick.emit();
    }

    _checkButtonIsVisible() {
        return this._parent.selectedRows().length == 0;
    }
}

@Component({
    selector: "smd-datatable-contextual-button",
    template: `
        <button md-icon-button
                *ngIf="_checkButtonIsVisible()"
                (click)="_onButtonClick($event)">
            <md-icon>{{icon}}</md-icon>
        </button>
    `
})
export class SmdContextualDatatableButton {
    @Input() icon: string;
    @Input() minimunSelected: number = -1;
    @Input() maxSelected: number = -1;
    @Output() onClick: EventEmitter<any[]> = new EventEmitter<any[]>();

    constructor(@Inject(forwardRef(() => SmdDataTable)) private _parent: SmdDataTable) {
    }

    _onButtonClick(event: Event) {
        this.onClick.emit(this._parent.selectedModels());
    }

    _checkButtonIsVisible() {
        let shouldShow = true;
        if (this.minimunSelected != null && this.minimunSelected > 0 && this._parent.selectedRows().length < this.minimunSelected) {
            shouldShow = false;
        }
        if (shouldShow && this.maxSelected > 0 && this._parent.selectedRows().length > this.maxSelected) {
            shouldShow = false;
        }
        return shouldShow;
    }
}

@Component({
    selector: "smd-datatable-header",
    template: `
        <div>
            <span *ngIf="title && !_hasRowsSelected()">{{title}}</span>        
            <ng-content select="smd-datatable-action-button"></ng-content>
            <span *ngIf="_hasRowsSelected()">
                {{_selectedRowsLength()}} {{_selectedRowsLength() == 1 ? 'item selected' : 'items selected'}}
            </span>
        </div>
        <span>
            <div>
                <md-input-container *ngIf="enableFilter && _selectedRowsLength() == 0">
                  <input md-input [placeholder]="filterLabel" [(ngModel)]="filterValue" (keyup)="_onFilter($event)">
                </md-input-container>
                <ng-content select="smd-datatable-contextual-button"></ng-content>
            </div>
        </span>
    `,
    host: {
        '[class.is-selected]': '_hasRowsSelected()'
    }
})
export class SmdDatatableHeader implements AfterContentInit, OnDestroy {

    private filterTimeout: any;
    public filterValue: string;

    @Input() title: string = null;
    @Input() enableFilter: boolean = false;
    @Input() filterLabel: string = "Filter";
    @Input() filterDelay: number = 500;

    @ContentChildren(SmdDatatableActionButton) actionButtons: QueryList<SmdDatatableActionButton>;
    @ContentChildren(SmdContextualDatatableButton) contextualButtons: QueryList<SmdContextualDatatableButton>;

    constructor(@Inject(forwardRef(() => SmdDataTable)) private _parent: SmdDataTable) {
    }

    public shouldRenderCheckbox() {
        return this.contextualButtons && this.contextualButtons.toArray().filter((button: SmdContextualDatatableButton) => button.minimunSelected > 0).length > 0;
    }

    private _hasRowsSelected(): boolean {
        return this._parent.selectedRows().length > 0;
    }

    private _selectedRowsLength(): number {
        return this._parent.selectedRows().length;
    }

    private _onFilter(event : any) : void {
        if(this.filterTimeout) {
            clearTimeout(this.filterTimeout);
        }

        this.filterTimeout = setTimeout(() => {
            this._parent._onFilter(event);
            this.filterTimeout = null;
        }, this.filterDelay);
    }

    ngAfterContentInit(): void {
        if (this.title && this.actionButtons.length > 0) {
            throw new Error('You must either define a title or action buttons to the datatable-header, not both');
        }
    }

    ngOnDestroy(): void {
        if (this.filterTimeout) {
            clearTimeout(this.filterTimeout);
        }
    }
}

@Component({
    selector: "smd-datatable",
    templateUrl: "./datatable.component.html",
    styleUrls: ["./datatable.component.scss"],
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class.smd-responsive]': 'responsive'
    }
})
export class SmdDataTable implements DoCheck, AfterContentInit, OnDestroy {

    private rows: SmdDataRowModel[] = [];
    private visibleRows: SmdDataRowModel[] = [];
    private differ: any;
    private _columnsSubscription: Subscription;

    get rowCount(): number {
        return this.rows.length;
    }

    @ViewChild(SmdPaginatorComponent) paginatorComponent: SmdPaginatorComponent;
    @ContentChild(SmdDatatableHeader) header: SmdDatatableHeader;
    @ContentChildren(SmdDataTableColumnComponent) columns: QueryList<SmdDataTableColumnComponent>;

    @Input() models: any[] = [];
    @Input() checked: boolean = false;
    @Input() paginated: boolean = true;
    @Input() paginatorRanges: number[] = [10, 25, 50, 100];
    @Input() responsive: boolean = false;

    @Output() onRowSelected: EventEmitter<{model: any, checked: boolean}> = new EventEmitter<{model: any, checked: boolean}>();
    @Output() onAllRowsSelected: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(differs: IterableDiffers, private _viewContainer: ViewContainerRef, public changeDetector: ChangeDetectorRef) {
        this.differ = differs.find([]).create(null);
    }

    ngAfterContentInit() {
        this._updateRows();
        this._columnsSubscription = this.columns.changes.subscribe(() => {
            this._updateRows();
            this.changeDetector.markForCheck();
        });
    }

    ngDoCheck(): void {
        let changes = this.differ.diff(this.models);
        if (changes) {
            if (this.columns) {
                this._updateRows();
            }
        }
    }

    ngOnDestroy(): void {
        this._columnsSubscription.unsubscribe();
    }

    _updateRows() {
        if (this.models) {
            this.rows.length = 0;
            this.models.forEach((model: any, index: number) => this.rows[index] = new SmdDataRowModel(model, this.checked));
            this.rows = this.rows.filter((row: SmdDataRowModel) => this._matches(row, this.columns.toArray(), this.header.filterValue));
            this.rows.forEach((row, index) => row.originalOrder = index);
            this._updateVisibleRows();
        }
    }

    _matches(row: SmdDataRowModel, columns: SmdDataTableColumnComponent[], text: string):boolean {
        if(isNullOrUndefined(text) || text.trim() == '') {
            return true;
        }

        let subtexts : string[] = text.trim().split(" ");
        for(let subtext of subtexts) {
            for (let column of columns) {
                let filterFn = this._filterValue;
                let value = column.getFieldValue(row.model);
                if (column.hasCustomTemplate) {
                    value = row.model;
                    filterFn = column.filterFn ? column.filterFn : (value: any, text: string) => false;
                }
                if (filterFn(value, subtext)) {
                    return true;
                }
            }
        }
        return false;
    }

    private _filterValue(value: any, text: string):boolean {
        return value && value.toString().toUpperCase().indexOf(text.toString().toUpperCase()) > -1;
    }

    selectedRows(): SmdDataRowModel[] {
        return this.rows.filter(row => row.checked);
    }

    selectedModels(): any[] {
        return this.selectedRows().map(row => row.model);
    }

    _onMasterCheckChange() {
        this.rows
            .forEach(
                (row : SmdDataRowModel) => {
                    if(row.checked != this.checked) {
                        row.checked = this.checked;
                    }
                }
            );
        this.onAllRowsSelected.emit(this.checked);
    }

    _onRowCheckChange(row: SmdDataRowModel) {
        let isMasterChecked = this.checked;
        if (row.checked) {
            if (this.rows.filter((row) => row.checked).length == this.rows.length) {
                this.checked = true;
            }
        } else {
            if (this.checked) {
                this.checked = false;
            }
        }
        this.onRowSelected.emit({
            model: row.model,
            checked: row.checked
        });

        if (this.checked != isMasterChecked) {
            this.onAllRowsSelected.emit(this.checked);
        }
    }

    _onFilter(event : any) : void {
        this.paginatorComponent.reset();
        this._updateRows();
    }

    _sortColumn(column: SmdDataTableColumnComponent) {
        if (column.sortable) {
            this.columns.filter((col) => col.id != column.id).forEach((col) => col.sortDir = null);

            if (!column.sortDir) {
                column.sortDir = 'asc';
            } else {
                column.sortDir = column.sortDir == 'asc' ? 'desc' : null;
            }

            if (column.sortDir != null) {
                this.rows.sort((itemA: SmdDataRowModel, itemB: SmdDataRowModel) => {
                    let sortFn = column.sortFn ? column.sortFn : this._sortRows;
                    let a = itemA.model;
                    let b = itemB.model;
                    if (!column.sortFn) {
                        a = column.getFieldValue(itemA.model);
                        b = column.getFieldValue(itemB.model);
                    }
                    return sortFn(a, b, column.sortDir);
                });
            } else {
                this.rows.sort((itemA: SmdDataRowModel, itemB: SmdDataRowModel) => {
                    return this._sortRows(itemA.originalOrder, itemB.originalOrder);
                });
            }
            this._updateVisibleRows();
        }
    }

    _sortRows(a: any, b: any, sortDir: string = 'asc') {
        let dir = (sortDir == 'asc' ? 1 : -1);
        if (a > b) {
            return 1 * dir;
        }
        if (a < b) {
            return -1 * dir;
        }
        return 0;
    }

    _onPageChange() {
        this._updateVisibleRows()
    }

    _columnTemplates() {
        return this.columns.toArray().map((c) => c.template);
    }

    public refresh() {
        this._updateRows();
    }

    private _updateVisibleRows() {
        if (this.paginated) {
            this.visibleRows = this.rows.filter((value: SmdDataRowModel, index: number) => this.paginatorComponent.currentPage.isInsidePage(index));
        } else {
            this.visibleRows = this.rows;
        }
    }

    private _shouldRenderCheckbox() {
        return this.rows.length > 0 && this.header.shouldRenderCheckbox();
    }
}