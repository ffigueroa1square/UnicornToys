import { Injectable } from "@angular/core";
import { AbstractControl, FormGroup, FormGroupDirective, NgForm } from "@angular/forms";
import { ReplaySubject, Subject } from "rxjs";
import { FieldValidation } from "../models/field-validation.model";
import { CustomErrorStateMatcher } from "../util/error-state-matcher";
import { FormIntactChecker } from "../util/form-intact-checker";
import { BaseComponent } from "./base.component";

@Injectable()
export class BaseFormComponent extends BaseComponent {
    formChanged: boolean;
    formIntactChecker: FormIntactChecker;
    errorStateWatcher = new CustomErrorStateMatcher();

    constructor() {
        super();
        this.formChanged = false;
        this.formIntactChecker = new FormIntactChecker(new FormGroup({}), new ReplaySubject<boolean>());
        this.componentDestroys = new Subject();
    }

    hasError(form: NgForm | FormGroupDirective | null, controlName: string, fieldValidagtion: FieldValidation): boolean {
        if (!form) {
            return false;
        }

        const control = this.getControl(form, controlName);

        if (!control) {
            return false;
        }

        const displayError = control.hasError(fieldValidagtion.type) && control.invalid && form.submitted;

        return displayError ? displayError : false;
    }

    listenFormChanges(form: FormGroup): void {
        const rs = new ReplaySubject<boolean>();

        rs.subscribe((isIntact: boolean) => {
            this.formChanged = !isIntact;
        });

        // When using the class with a ReplaySubject, the .pristine/.dirty
        // will not change their behavior, even if the user undoes his changes,
        // but we can do whatever we want in the subject's subscription.
        this.formIntactChecker = new FormIntactChecker(form, rs);
    }

    protected getControl(form: NgForm | FormGroupDirective | null, controlName: string): AbstractControl | null {

        if (form instanceof NgForm) {
            return (form as NgForm).controls[controlName];
        }

        const formGroup = (form!.control as FormGroup);

        if (formGroup) {
            return formGroup.controls[controlName];
        }

        return null;
    }
}
