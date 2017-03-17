import {
    Component,
    Input,
    OnInit,
    ContentChildren,
    QueryList,
    ViewEncapsulation,
    Directive,
    ViewContainerRef,
    TemplateRef,
    ViewChildren,
    OnDestroy
} from "@angular/core";
import {FormControl, NgModel} from "@angular/forms";
import {Subscription} from "rxjs";

@Directive({
    selector: "template[smdErrorMessage]",
    host: {
        '[class.smd-error-message]': 'true',
        '[class.smd-visible]': 'visible'
    }
})
export class SmdErrorMessageComponent {
    private visible:boolean = false;

    @Input() for: string | string[];
    @Input() error: any;

    get forList():string[] {
        if (typeof this.for === 'string') {
            this.for = [this.for];
        }
        return this.for;
    }

    constructor(private viewContainer: ViewContainerRef, private template: TemplateRef<SmdErrorMessageComponent>) {
    }

    contains(key: string):boolean {
        return this.forList && !!this.forList.find((elem) => elem == key);
    }

    show(error: any) {
        this.error = error;
        if (!this.visible) {
            this.viewContainer.createEmbeddedView(this.template, this);
        }
        this.visible = true;
    }

    hide() {
        if (this.visible) {
            this.viewContainer.clear();
        }
        this.visible = false;
    }
}

@Component({
    selector: "smd-error-messages",
    template: `
        <ng-content select="template[smdErrorMessage]"></ng-content>
        <template smdErrorMessage for="required">Required Field</template>
        <template smdErrorMessage for="minlength" let-myError="error">The field must have at least {{myError.requiredLength}} characters</template>
        <template smdErrorMessage for="maxlength" let-myError="error">The field must have less than {{myError.requiredLength}} characters</template>
    `,
    styleUrls: ['smd-error-message.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SmdErrorMessagesComponent implements OnInit, OnDestroy {
    private _subscriptions: Subscription[] = [];
    private formControl: FormControl;

    @Input() control: NgModel | FormControl;

    @ContentChildren(SmdErrorMessageComponent) _messages: QueryList<SmdErrorMessageComponent>;
    @ViewChildren(SmdErrorMessageComponent) _internalMessages: QueryList<SmdErrorMessageComponent>;

    ngOnInit(): void {
        if ((<NgModel>this.control).control) {
            this.formControl = (<NgModel>this.control).control;
        } else {
            this.formControl = this.control as FormControl;
        }

        // Wrap markAsTouched to update this component when the component is first touched
        let originalMarkAsTouched = this.formControl.markAsTouched;
        this.formControl.markAsTouched = (elem: any) => {
            let wasTouched = this.formControl.touched;
            originalMarkAsTouched.apply(this.formControl, [elem]);
            if (!wasTouched) {
                this.updateErrorMessages();
            }
        };

        this._subscriptions.push(this.formControl.valueChanges.subscribe(() => {
            this.updateErrorMessages();
        }));
        this._subscriptions.push(this.formControl.statusChanges.subscribe(() => {
            this.updateErrorMessages();
        }));
    }

    ngOnDestroy(): void {
        this._subscriptions.forEach((sub) => sub.unsubscribe());
    }

    private updateErrorMessages() {
        if (this.formControl.touched) {
            let messages = this.mergeMessages();
            messages.forEach((message) => {
                let error:any = null;

                for (let key in this.formControl.errors) {
                    if (message.contains(key)) {
                        error = this.formControl.errors[key];
                        break;
                    }
                }

                if (error) {
                    message.show(error);
                } else {
                    message.hide();
                }
            });
        }
    }

    private mergeMessages() {
        let newMessages: SmdErrorMessageComponent[] = [];
        let keys = {};

        this._messages.forEach((message) => {
            newMessages.push(message);
            message.forList.forEach((key) => {
                keys[key] = 1;
            });
        });

        this._internalMessages.forEach((message) => {
            if (!message.forList.find((elem) => keys[elem])) {
                newMessages.push(message);
                message.forList.forEach((key) => {
                    keys[key] = 1;
                });
            }
        });

        return newMessages;
    }
}