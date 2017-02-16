import {Component, Input} from "@angular/core";

@Component({
    selector: 'demo-fab-speed-dial',
    templateUrl: './demo-fab-speed-dial.html',
    styleUrls: ['./demo-fab-speed-dial.scss']
})
export class DemoFabSpeedDial {

    open: boolean = false;
    direction: string = 'up';
    animationMode: string = 'fling';

}