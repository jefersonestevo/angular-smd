import {
    Component,
    ViewEncapsulation,
    Directive,
    ContentChild,
    TemplateRef,
    ContentChildren,
    QueryList,
    ViewChild,
    trigger,
    state,
    style,
    transition,
    animate, OnInit, Input,
} from "@angular/core";

@Directive({
    selector: "template[smdBottomNavLabel]",
})
export class SmdBottomNavLabelDirective {

    constructor(public template: TemplateRef<void>) {}

}

@Component({
    selector: "smd-bottom-nav",
    template: `
        <ng-content select="template[smdBottomNavLabel]"></ng-content>
        <template #contentTemplate>
            <ng-content></ng-content>
        </template>
    `
})
export class SmdBottomNavComponent {

    public state:'active' | 'inactive';

    @Input() public color: string = 'primary';

    @ContentChild(SmdBottomNavLabelDirective) label: SmdBottomNavLabelDirective;
    @ViewChild('contentTemplate') content: TemplateRef<void>;

}

@Component({
    selector: "smd-bottom-nav-group",
    templateUrl: './smd-bottom-nav.component.html',
    styleUrls: ['./smd-bottom-nav.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': '_getClasses()'
    },
    animations: [
        trigger('itemState', [
            state('inactive', style({opacity: '0'})),
            state('active', style({opacity: '1'})),
            transition('* => *', [
                animate('1s ease-in-out')
            ])
        ])
    ]
})
export class SmdBottomNavGroupComponent implements OnInit {
    _currentIndex:number;

    get currentIndex() {
        return this._currentIndex;
    }
    set currentIndex(index:number) {
        this._currentIndex = index;
        Promise.resolve(null).then(() => {
            this.navs.forEach((item, i) => {
                if (i == this.currentIndex) {
                    item.state = 'active';
                } else {
                    item.state = 'inactive';
                }
            });
        });
    }

    @ContentChildren(SmdBottomNavComponent) navs: QueryList<SmdBottomNavComponent>;

    ngOnInit(): void {
        this.currentIndex = 0;
    }

    setActiveIndex(index:number) {
        let previousIndex = this.currentIndex;
        this.currentIndex = index;
    }

    _getClasses() {
        return `smd-${this._getSelectedItem(this.currentIndex).color}`
    }

    _getSelectedItem(index:number) {
        return this.navs.find((item, i) => i == index);
    }

}