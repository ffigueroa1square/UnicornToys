import { FormControl, FormGroupDirective, NgForm } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";

// define custom ErrorStateMatcher
export class CustomErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl, form: NgForm | FormGroupDirective | null): boolean {
        return control && control.invalid && form!.submitted;
    }
}