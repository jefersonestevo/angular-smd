import {Component, Input, Output, EventEmitter, OnInit, ViewEncapsulation} from "@angular/core";

export class SmdPaginationModel {
    constructor(public page : number,
                public size : number) {
    }

    public isInsidePage(index : number):boolean {
        let end = (this.page * this.size) - 1;
        let begin = end - this.size + 1;
        return index >= begin && index <= end;
    }
}

@Component({
    selector: "smd-paginator",
    templateUrl: "./paginator.component.html",
    styleUrls: ["./paginator.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class SmdPaginatorComponent implements OnInit {

    private _selectedRange : number;

    @Input() selectedPage : number = 1;
    @Input() count : number = 0;
    @Input() ranges : number[] = [10, 25, 50, 100];
    @Input() set selectedRange(selectedRange: number) {
        let current = this._selectedRange;
        this._selectedRange = selectedRange;

        if (current != this._selectedRange) {
            this.reset();
        }
    }

    get selectedRange(): number {
        return this._selectedRange;
    }

    @Output() pageChange : EventEmitter<SmdPaginationModel> = new EventEmitter<SmdPaginationModel>();

    ngOnInit(): void {
        if (!this.selectedRange) {
            this.selectedRange = this.ranges[0];
        }
    }

    onPreviousClick() {
        if (this.selectedPage > 1) {
            this.selectedPage -= 1;
            this.pageChange.emit(this.currentPage);
        }
    }

    onNextClick() {
        if (this.selectedPage < this.pageCount) {
            this.selectedPage += 1;
            this.pageChange.emit(this.currentPage);
        }
    }

    public reset() {
        this.selectedPage = 1;
        this.pageChange.emit(this.currentPage);
    }

    get pageCount():number {
        let pageCount = (this.count / this.selectedRange) + ((this.count % this.selectedRange) > 0 ? 1 : 0);
        return pageCount ? parseInt('' + pageCount) : 0;
    }

    get pageStart():number {
        return parseInt('' + ((this.selectedPage * this.selectedRange) - this.selectedRange + 1));
    }

    get pageEnd():number {
        return parseInt('' + Math.min((this.selectedPage * this.selectedRange), this.count));
    }

    get currentPage() {
        return new SmdPaginationModel(this.selectedPage, this.selectedRange);
    }
}