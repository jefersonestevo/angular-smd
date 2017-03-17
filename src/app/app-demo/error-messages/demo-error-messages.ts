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

}