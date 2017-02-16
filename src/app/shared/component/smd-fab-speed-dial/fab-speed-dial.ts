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
            this.changeElementStyle(button, 'z-index', '' + (23 - i));
        })
    }

    show() {
        if (this._buttons) {
            this._buttons.toArray().forEach((button, i) => {
                let transitionDelay = 0;
                let transform;
                if (this._parent.animationMode == 'scale') {
                    transitionDelay = 3 + (65 * i);
                    transform = 'scale(1)';
                } else {
                    transform = this.getTranslateFunction('0');
                }
                this.changeElementStyle(button, 'transition-delay', transitionDelay + 'ms');
                this.changeElementStyle(button, 'opacity', '1');
                this.changeElementStyle(button, 'transform', transform);
            })
        }
    }

    hide() {
        if (this._buttons) {
            this._buttons.toArray().forEach((button, i) => {
                let opacity = '1';
                let transitionDelay = 0;
                let transform;
                if (this._parent.animationMode == 'scale') {
                    transitionDelay = 3 - (65 * i);
                    transform = 'scale(0)';
                    opacity = '0';
                } else {
                    transform = this.getTranslateFunction((55 * (i + 1) - (i * 5)) + 'px');
                }
                this.changeElementStyle(button, 'transition-delay', transitionDelay + 'ms');
                this.changeElementStyle(button, 'opacity', opacity);
                this.changeElementStyle(button, 'transform', transform);
            })
        }
    }

    private getTranslateFunction(value: string) {
        let dir = this._parent.direction;
        let translateFn = (dir == 'up' || dir == 'down') ? 'translateY' : 'translateX';
        let sign = (dir == 'down' || dir == 'right') ? '-' : '';
        return translateFn + '(' + sign + value + ')';
    }

    private changeElementStyle(button: MdButton, style: string, value: string) {
        // FIXME - Find a way to create a "wrapper" around the action button(s) provided by the user, so we don't change it's style tag
        this.renderer.setElementStyle(button._getHostElement(), style, value);
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
        '[class.smd-scale]': 'animationMode == "scale"',
        '[class.smd-fling]': 'animationMode == "fling"',
        '(click)': '_onClick()'
    }
})
export class FabSpeedDialComponent implements AfterContentInit {
    private isInitialized: boolean = false;
    private _direction: string = 'up';
    private _open: boolean = false;
    private _animationMode: string = 'fling';

    @Input() fixed: boolean = false;
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

    @Input() get animationMode() { return this._animationMode; }
    set animationMode(animationMode: string) {
        let previousAnimationMode = this._animationMode;
        this._animationMode = animationMode;
        if (this.isInitialized && previousAnimationMode != this._animationMode) {
            // To start another detect lifecycle and force the "close" on the action buttons
            Promise.resolve(null).then(() => this.open = false);
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
        if (!this.fixed) {
            this.open = !this.open;
            this.adjustActionsVisibility();
        }
    }

    adjustActionsVisibility() {
        if (this.open) {
            this._childActions.show();
        } else {
            this._childActions.hide();
        }
    }
}
