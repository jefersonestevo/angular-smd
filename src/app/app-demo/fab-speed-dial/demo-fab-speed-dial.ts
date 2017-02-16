import {Component, Input} from "@angular/core";

@Component({
    selector: 'demo-fab-speed-dial',
    templateUrl: './demo-fab-speed-dial.html',
    styleUrls: ['./demo-fab-speed-dial.scss']
})
export class DemoFabSpeedDial {

    private _fixed: boolean = false;

    open: boolean = false;
    spin: boolean = false;
    direction: string = 'up';
    animationMode: string = 'fling';

    get fixed() { return this._fixed; }
    set fixed(fixed: boolean) {
        this._fixed = fixed;
        if (this._fixed) {
            this.open = true;
        }
    }

    _click(event: any) {
        console.log(event);
    }

    tsExample: string = `
    export class DemoFabSpeedDial {
        open: boolean = false;
        fixed: boolean = false;
        spin: boolean = false;
        direction: string = 'up';
        animationMode: string = 'fling';
        
        _click(event: any) {
            console.log(event);
        }
    }
    `;

    htmlExample: string = `
    <md-card>
        <md-card-title>Click me!!</md-card-title>
        <md-slide-toggle [(ngModel)]="open">Open</md-slide-toggle>
        <smd-fab-speed-dial [(open)]="open" [direction]="direction" [animationMode]="animationMode" [fixed]="fixed">
            <smd-fab-trigger [spin]="spin">
                <button md-fab (click)="_click('trigger')"><md-icon>check</md-icon></button>
            </smd-fab-trigger>

            <smd-fab-actions>
                <button md-mini-fab (click)="_click('action1')"><md-icon>add</md-icon></button>
                <button md-mini-fab (click)="_click('action2')"><md-icon>edit</md-icon></button>
                <button md-mini-fab (click)="_click('action3')"><md-icon>menu</md-icon></button>
            </smd-fab-actions>
        </smd-fab-speed-dial>
    </md-card>
    <md-card>
        <md-card-title>Hover me!!</md-card-title>
        <smd-fab-speed-dial #myFab [direction]="direction" [animationMode]="animationMode" [fixed]="fixed"
                            (mouseenter)="myFab.open = true" (mouseleave)="myFab.open = false">
            <smd-fab-trigger [spin]="spin">
                <button md-fab (click)="_click('trigger')"><md-icon>check</md-icon></button>
            </smd-fab-trigger>

            <smd-fab-actions>
                <button md-mini-fab (click)="_click('action1')"><md-icon>add</md-icon></button>
                <button md-mini-fab (click)="_click('action2')"><md-icon>edit</md-icon></button>
                <button md-mini-fab (click)="_click('action3')"><md-icon>menu</md-icon></button>
            </smd-fab-actions>
        </smd-fab-speed-dial>
    </md-card>
    `;
}