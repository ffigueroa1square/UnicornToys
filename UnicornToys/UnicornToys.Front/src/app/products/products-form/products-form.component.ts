import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BaseFormComponent } from 'src/app/shared/base/base-form.component';
import { FieldValidation } from 'src/app/shared/models/field-validation.model';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.scss']
})
export class ProductsFormComponent extends BaseFormComponent implements OnInit {

  public submitted = false;
  public productId: number = 0;
  public form: FormGroup;
  validations: {
    Name: FieldValidation[],
    Price: FieldValidation[],
    AgeRestriction: FieldValidation[],
    Company: FieldValidation[],
    Description: FieldValidation[]    
  };
  
  constructor(
    formBuilder: FormBuilder,
    private _notificationService: NotificationService,
    private _productsService: ProductsService,  
    private _errorHandler: ErrorHandlerService,
    private _activatedRouter: ActivatedRoute,
    private _router: Router,
    private _toastr: ToastrService,
  ) { 
    super();

    this.validations = {
      Name: [
        new FieldValidation('required', 'VALIDATIONS.REQUIRED'),
        new FieldValidation('maxlength', 'VALIDATIONS.MAX-LENGTH', { 'fieldName': 'Title', 'fieldLength': '50' }),
      ],
      Price: [
        new FieldValidation('required', 'VALIDATIONS.REQUIRED'),
        new FieldValidation('min', 'VALIDATIONS.MIN-VALUE', { 'fieldName': 'Price', 'requiredValue': '1' }),
        new FieldValidation('max', 'VALIDATIONS.MAX-VALUE', { 'fieldName': 'Price', 'requiredValue': '1000' }),
      ],
      AgeRestriction: [
        new FieldValidation('min', 'VALIDATIONS.MIN-VALUE', { 'fieldName': 'Age Restriction', 'requiredValue': '0' }),
        new FieldValidation('max', 'VALIDATIONS.MAX-VALUE', { 'fieldName': 'Age Restriction', 'requiredValue': '100' }),
      ],
      Company: [
        new FieldValidation('required', 'VALIDATIONS.REQUIRED'),
        new FieldValidation('maxlength', 'VALIDATIONS.MAX-LENGTH', { 'fieldName': 'Company', 'fieldLength': '50' }),
      ],
      Description: [
        new FieldValidation('maxlength', 'VALIDATIONS.MAX-LENGTH', { 'fieldName': 'Description', 'fieldLength': '100' }),
      ]      
    };

    this.form = formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      price: [1, [Validators.required, Validators.min(1), Validators.max(1000)]],
      ageRestriction: [0, [Validators.min(0), Validators.max(100)]],
      company: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', Validators.maxLength(100)]
    })
  }

  ngOnInit(): void {
    this.productId = Number(this._activatedRouter.snapshot.params['id']);

    if (this.productId && this.productId > 0) {
      this._productsService.get(this.productId.toString());
    }
  }

  getById(id: string) {
    this._productsService.get(this.productId.toString())
      .subscribe({
        next: (product: Product) => {
          this.form.patchValue(product);
        },
        error: errorRespnse => {
          this._errorHandler.handle(errorRespnse);
        }
      });
  }

  submit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    let model = this.form.value;    
    if (this.productId && this.productId > 0) {
      model.id = this.productId;
      this._productsService.put(this.productId.toString(), model)      
        .subscribe({
          next: (response: boolean) => {
            if(response) {
              this.handleSuccess();
            } else {
              this._notificationService.success({ key: 'COMMON.SOMETHING_WRONG' });
            }
          }
        })
    } else {
      this._productsService.post(model)      
      .subscribe({
        next: (response: boolean) => {
          if(response) {
            this.handleSuccess();
          } else {
            this._notificationService.success({ key: 'COMMON.SOMETHING_WRONG' });
          }
        }
      })
    }
  }

  private handleSuccess(): void {
    this.form.markAsPristine();
    this._notificationService.success({ key: 'COMMON.SAVE_SUCCESS' });
    this.back();
  }

  private back() {
    this._router.navigate(['../'], { relativeTo: this._activatedRouter });
  }

  public showNotificacion() {
    //this._toastr.success('Hola', 'Prueba');
    //this._notificationService.success({ key: 'COMMON.SAVE_SUCCESS' });
    this._notificationService.success('hola', 'titulo');
  }
}
