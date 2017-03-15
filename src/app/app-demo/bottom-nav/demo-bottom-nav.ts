import {Component, ViewEncapsulation} from "@angular/core";

// Using ViewEncapsulation.None so we can create a custom color for the bottom nav component
@Component({
    selector: 'demo-bottom-nav',
    templateUrl: './demo-bottom-nav.html',
    styleUrls: ['./demo-bottom-nav.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DemoBottomNav {
    items = Array.apply(null, {length: 80}).map((v: any, i: number) => i);
}