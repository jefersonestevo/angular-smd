import {
    Component, Input, Output, EventEmitter, OnInit, ViewEncapsulation, AfterContentInit, OnDestroy, ElementRef,
    Renderer, Inject, forwardRef, ContentChildren, QueryList, ContentChild, OnChanges, SimpleChanges
} from "@angular/core";
import {MdButton} from "@angular/material";

@Component({
    selector: 'smd-fab-trigger',
    template: `
        <ng-content select="[md-fab], [mat-fab]"></ng-content>
    `
})
export class FabSpeedDialTrigger {

}

@Component({
    selector: 'smd-fab-actions',
    template: `
        <ng-content select="[md-mini-fab], [mat-mini-fab]"></ng-content>
    `
})
export class FabSpeedDialActions implements AfterContentInit {

    @ContentChildren(MdButton) _buttons: QueryList<MdButton>;

    constructor(@Inject(forwardRef(() => FabSpeedDialComponent)) private _parent: FabSpeedDialComponent, private renderer: Renderer) {
    }

    ngAfterContentInit(): void {
        this._buttons.changes.subscribe(() => {
            this.clearButtons();
            this._parent.adjustActionsVisibility();
        });

        this.clearButtons();
    }

    private clearButtons() {
        this._buttons.toArray().forEach((button, i) => {
            this.renderer.setElementStyle(button._getHostElement(), 'opacity', '1');
            this.renderer.setElementStyle(button._getHostElement(), 'z-index', '' + (23 - i));
        })
    }

    show() {
        if (this._buttons) {
            this._buttons.toArray().forEach((button, i) => {
                this.renderer.setElementStyle(button._getHostElement(), 'transform', this.getTranslateFunction('0'));
            })
        }
    }

    hide() {
        if (this._buttons) {
            this._buttons.toArray().forEach((button, i) => {
                this.renderer.setElementStyle(button._getHostElement(), 'transform', this.getTranslateFunction((55 * (i + 1) - (i * 5)) + 'px'));
            })
        }
    }

    private getTranslateFunction(value: string) {
        let func;
        switch (this._parent.direction) {
            case 'up':
                func = 'translateY(';
                break;
            case 'down':
                func = 'translateY(-';
                break;
            case 'left':
                func = 'translateX(';
                break;
            case 'right':
                func = 'translateX(-';
                break;
        }
        return func + value + ')';
}

}

@Component({
    selector: 'smd-fab-speed-dial',
    template: `
        <ng-content select="smd-fab-trigger"></ng-content>
        <ng-content select="smd-fab-actions"></ng-content>
    `,
    styleUrls: ['fab-speed-dial.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class.smd-up]': 'direction == "up"',
        '[class.smd-down]': 'direction == "down"',
        '[class.smd-left]': 'direction == "left"',
        '[class.smd-right]': 'direction == "right"',
        '(click)': '_onClick()'
    }
})
export class FabSpeedDialComponent implements AfterContentInit {
    private isInitialized: boolean = false;
    private _direction: string = 'up';
    private _open: boolean = false;

    @Input() get open() { return this._open; }
    set open(open: boolean) {
        let previousOpen = this._open;
        this._open = open;
        if (previousOpen != this._open) {
            this.openChange.emit(this._open);
            if (this.isInitialized) {
                this.adjustActionsVisibility();
            }
        }
    }

    @Input() get direction() { return this._direction; }
    set direction(direction: string) {
        let previousDir = this._direction;
        this._direction = direction;
        if (this.isInitialized && previousDir != this._direction) {
            this.adjustActionsVisibility();
        }
    }

    @Output() openChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    @ContentChild(FabSpeedDialActions) _childActions: FabSpeedDialActions;

    constructor(private elRef:ElementRef, private renderer: Renderer) {}

    ngAfterContentInit(): void {
        this.isInitialized = true;
        this.adjustActionsVisibility();
    }

    _onClick() {
        this.open = !this.open;
        this.adjustActionsVisibility();
    }

    adjustActionsVisibility() {
        if (this.open) {
            this._childActions.show();
        } else {
            this._childActions.hide();
        }
    }
}
