import {Component, Input} from "@angular/core";

@Component({
    selector: 'demo-fab-speed-dial',
    templateUrl: './demo-fab-speed-dial.html',
    styleUrls: ['./demo-fab-speed-dial.scss']
})
export class DemoFabSpeedDial {

    open: boolean = false;
    fixed: boolean = false;
    direction: string = 'up';
    animationMode: string = 'fling';

    tsExample: string = `
    export class DemoFabSpeedDial {
        open: boolean = false;
        fixed: boolean = false;
        direction: string = 'up';
        animationMode: string = 'fling';
    }
    `;

    htmlExample: string = `
    <md-card>
        <md-card-title>Click me!!</md-card-title>
        <md-slide-toggle [(ngModel)]="open">Open</md-slide-toggle>
        <smd-fab-speed-dial [(open)]="open" [direction]="direction" [animationMode]="animationMode" [fixed]="fixed">
            <smd-fab-trigger>
                <button md-fab><md-icon>check</md-icon></button>
            </smd-fab-trigger>

            <smd-fab-actions>
                <button md-mini-fab><md-icon>add</md-icon></button>
                <button md-mini-fab><md-icon>edit</md-icon></button>
                <button md-mini-fab><md-icon>menu</md-icon></button>
            </smd-fab-actions>
        </smd-fab-speed-dial>
    </md-card>
    <md-card>
        <md-card-title>Hover me!!</md-card-title>
        <smd-fab-speed-dial #myFab [direction]="direction" [animationMode]="animationMode" [fixed]="fixed"
                            (mouseenter)="myFab.open = true" (mouseleave)="myFab.open = false">
            <smd-fab-trigger>
                <button md-fab><md-icon>check</md-icon></button>
            </smd-fab-trigger>

            <smd-fab-actions>
                <button md-mini-fab><md-icon>add</md-icon></button>
                <button md-mini-fab><md-icon>edit</md-icon></button>
                <button md-mini-fab><md-icon>menu</md-icon></button>
            </smd-fab-actions>
        </smd-fab-speed-dial>
    </md-card>
    `;
}