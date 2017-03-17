import {Component, OnInit} from "@angular/core";
import {Validators, FormBuilder, FormGroup} from "@angular/forms";

@Component({
    selector: 'demo-fab-speed-dial',
    templateUrl: './demo-error-messages.html',
    styleUrls: ['./demo-error-messages.scss']
})
export class DemoErrorMessages implements OnInit {
    requiredField: string;
    minLengthField: string;
    requiredFieldCustomMessage: string;

    myReactiveForm: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.myReactiveForm = this.fb.group({
            'requiredFieldReactive': ['', Validators.required],
            'minLengthFieldReactive': ['', Validators.minLength(3)],
            'requiredFieldCustomMessageReactive': ['', Validators.required],
            'requiredFieldCustomValidationReactive': ['', this.myCustomReactiveValidation()]
        })
    }

    myCustomReactiveValidation(): any {
        return (control: any): {[key: string]: any} => {
            if (!control.value) {
                return;
            }
            return control.value == 'AAA' ? null : {myValidationError: {validItem: 'AAA'}};
        };
    }

    tsExample: string = `
    export class DemoErrorMessages implements OnInit {
        requiredField: string;
        minLengthField: string;
        requiredFieldCustomMessage: string;
    
        myReactiveForm: FormGroup;
    
        constructor(private fb: FormBuilder) {
        }
    
        ngOnInit(): void {
            this.myReactiveForm = this.fb.group({
                'requiredFieldReactive': ['', Validators.required],
                'minLengthFieldReactive': ['', Validators.minLength(3)],
                'requiredFieldCustomMessageReactive': ['', Validators.required],
                'requiredFieldCustomValidationReactive': ['', this.myCustomReactiveValidation()]
            })
        }
    
        myCustomReactiveValidation(): any {
            return (control: any): {[key: string]: any} => {
                if (!control.value) {
                    return;
                }
                return control.value == 'AAA' ? null : {myValidationError: {validItem: 'AAA'}};
            };
        }
    }
    `;

    htmlExample: string = `
    <md-card>
        <md-card-title>Template Form</md-card-title>
        <div class="row">
            <div class="column">
                <md-input-container>
                    <input type="text" mdInput placeholder="Required Field" [(ngModel)]="requiredField"
                           required name="requiredField" #requiredFieldModel="ngModel"/>
                </md-input-container>
                <smd-error-messages [control]="requiredFieldModel"></smd-error-messages>
            </div>
            <div class="column">
                <md-input-container>
                    <input type="text" mdInput placeholder="MinLength Field" [(ngModel)]="minLengthField"
                           minlength="3" name="minLengthField" #minLengthFieldModel="ngModel"/>
                </md-input-container>
                <smd-error-messages [control]="minLengthFieldModel"></smd-error-messages>
            </div>
            <div class="column">
                <md-input-container>
                    <input type="text" mdInput placeholder="Required Field (With Custom Message)" [(ngModel)]="requiredFieldCustomMessage"
                           required name="requiredFieldCustomMessage" #requiredFieldCustomMessageModel="ngModel"/>
                </md-input-container>
                <smd-error-messages [control]="requiredFieldCustomMessageModel">
                    <template smdErrorMessage for="required">This Field is Required with a custom message</template>
                </smd-error-messages>
            </div>
        </div>
    </md-card>
    
    <md-card>
        <md-card-title>Reactive Form</md-card-title>
        <form [formGroup]="myReactiveForm">
            <div class="row">
                <div class="column">
                    <md-input-container>
                        <input type="text" mdInput placeholder="Required Field" formControlName="requiredFieldReactive" required/>
                    </md-input-container>
                    <smd-error-messages [control]="myReactiveForm.get('requiredFieldReactive')"></smd-error-messages>
                </div>
                <div class="column">
                    <md-input-container>
                        <input type="text" mdInput placeholder="MinLength Field" formControlName="minLengthFieldReactive" minlength="3"/>
                    </md-input-container>
                    <smd-error-messages [control]="myReactiveForm.get('minLengthFieldReactive')"></smd-error-messages>
                </div>
            </div>
            <div class="row">
                <div class="column">
                    <md-input-container>
                        <input type="text" mdInput placeholder="Required Field (With Custom Message)" formControlName="requiredFieldCustomMessageReactive" required/>
                    </md-input-container>
                    <smd-error-messages [control]="myReactiveForm.get('requiredFieldCustomMessageReactive')">
                        <template smdErrorMessage for="required">This Field is Required with a custom message</template>
                    </smd-error-messages>
                </div>
                <div class="column">
                    <md-input-container>
                        <input type="text" mdInput placeholder="With Custom Validation" formControlName="requiredFieldCustomValidationReactive"/>
                    </md-input-container>
                    <smd-error-messages [control]="myReactiveForm.get('requiredFieldCustomValidationReactive')">
                        <template smdErrorMessage for="myValidationError" let-error="error">Try to type '{{error.validItem}}'</template>
                    </smd-error-messages>
                </div>
            </div>
        </form>
    </md-card>
    `;

}