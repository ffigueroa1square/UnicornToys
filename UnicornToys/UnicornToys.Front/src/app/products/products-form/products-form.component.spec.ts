import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ProductsService } from '../services/products.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductsFormComponent } from './products-form.component';
import { UploadImagesComponent } from 'src/app/shared/upload-images/upload-images.component';
import { UploadImagesService } from 'src/app/shared/services/upload-images.service';
import { defer, Observable, of, throwError } from 'rxjs';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { TranslateStubsModule } from 'src/tests/translate-stubs.module';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product.model';
import { ProductDto } from '../models/productDto.model';

describe('ProductsFormComponent', () => {
  let component: ProductsFormComponent;
  let fixture: ComponentFixture<ProductsFormComponent>;

  let translateService: TranslateService;
  let productsService: ProductsService;
  let errorHandlerService: ErrorHandlerService;
  let uploadImageService: UploadImagesService;
  let notificationService: NotificationService;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    const formBuilder: FormBuilder = new FormBuilder();
    const translateServiceSpy = jasmine.createSpyObj('TranslateService', [
      'get',
    ]);
    const productsServiceSpy = jasmine.createSpyObj('ProductsService', [
      'get',
      'post',
      'put',
    ]);
    const notificationServiceSpy = jasmine.createSpyObj('NotificationService', [
      'success',
      'error',
    ]);
    const errorHandlerSpy = jasmine.createSpyObj('ErrorHandlerService', [
      'handle',
    ]);
    const uploadImageServiceSpy = jasmine.createSpyObj('UploadImageService', [
      'post',
    ]);

    translateServiceSpy.get = jasmine
      .createSpy('get')
      .and.returnValue(new Observable());
    productsServiceSpy.get = () => new Observable<Product>();

    await TestBed.configureTestingModule({
      declarations: [ProductsFormComponent, UploadImagesComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        TranslateModule.forRoot(),
        MatInputModule,
        SharedModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterTestingModule,
        TranslateStubsModule,
      ],
      providers: [
        { provide: FormBuilder, useValue: formBuilder },
        { provide: ProductsService, useValue: productsServiceSpy },
        { provide: NotificationService, useValue: notificationServiceSpy },
        { provide: ErrorHandlerService, useValue: errorHandlerSpy },
        { provide: UploadImagesService, useValue: uploadImageServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: { id: 0 },
            },
          },
        },
      ],
    }).compileComponents();

    translateService = TestBed.inject(TranslateService);
    productsService = TestBed.inject(ProductsService);
    errorHandlerService = TestBed.inject(ErrorHandlerService);
    uploadImageService = TestBed.inject(UploadImagesService);
    activatedRoute = TestBed.inject(ActivatedRoute);
    notificationService = TestBed.inject(NotificationService);
    fixture = TestBed.createComponent(ProductsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get a product object', async () => {
    // Arrange
    activatedRoute.snapshot.params = { id: '1' };
    fixture.detectChanges();
    const expected: Product = {
      id: 1,
      name: 'product 1',
      description: 'description 1',
      ageRestriction: 10,
      company: 'company test 1',
      price: 10,
      imageName: '',
      imageLocation: '',
    };

    productsService.get = jasmine
      .createSpy('get')
      .and.returnValue(defer(() => Promise.resolve(expected)));

    // Act
    component.ngOnInit();

    // Assert
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.form.controls['name'].value).toEqual(expected.name);
      expect(component.form.controls['price'].value).toEqual(expected.price);
    });
  });

  it('should throw an error when get product', async () => {
    // Arrange
    activatedRoute.snapshot.params = { id: '1' };
    fixture.detectChanges();
    productsService.get = jasmine
      .createSpy('get')
      .and.returnValue(throwError(() => new Error('error')));

    // Act
    component.ngOnInit();

    // Assert
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(errorHandlerService.handle).toHaveBeenCalled();
    });
  });

  it('should create a new product', async () => {
    // Arrange
    const model: ProductDto = {
      name: 'product 1',
      description: 'description 1',
      ageRestriction: 10,
      company: 'company test 1',
      price: 10,
      imageName: '',
      imageLocation: '',
    };
    component.form.patchValue(model);

    productsService.post = jasmine
      .createSpy('post')
      .and.returnValue(defer(() => Promise.resolve(true)));

    // Act
    component.submit();

    // Assert
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(notificationService.success).toHaveBeenCalled();
    });
  });

  it('should throw an error when create a new product', async () => {
    // Arrange
    const model: ProductDto = {
      name: 'product 1',
      description: 'description 1',
      ageRestriction: 10,
      company: 'company test 1',
      price: 10,
      imageName: '',
      imageLocation: '',
    };
    component.form.patchValue(model);

    productsService.post = jasmine
      .createSpy('post')
      .and.returnValue(throwError(() => new Error('error')));

    // Act
    component.submit();

    // Assert
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(errorHandlerService.handle).toHaveBeenCalled();
    });
  });

  it('should update a product', async () => {
    // Arrange
    activatedRoute.snapshot.params = { id: '1' };
    component.productId = 1;
    fixture.detectChanges();
    const model: ProductDto = {
      name: 'product 1',
      description: 'description 1',
      ageRestriction: 10,
      company: 'company test 1',
      price: 10,
      imageName: '',
      imageLocation: '',
    };
    component.form.patchValue(model);

    productsService.put = jasmine
      .createSpy('put')
      .and.returnValue(defer(() => Promise.resolve(true)));

    // Act
    component.submit();

    // Assert
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(notificationService.success).toHaveBeenCalled();
    });
  });

  it('should throw an error when update a product', async () => {
    // Arrange
    activatedRoute.snapshot.params = { id: '1' };
    component.productId = 1;
    fixture.detectChanges();
    const model: ProductDto = {
      name: 'product 1',
      description: 'description 1',
      ageRestriction: 10,
      company: 'company test 1',
      price: 10,
      imageName: '',
      imageLocation: '',
    };
    component.form.patchValue(model);

    productsService.put = jasmine
      .createSpy('put')
      .and.returnValue(throwError(() => new Error('error')));

    // Act
    component.submit();

    // Assert
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(errorHandlerService.handle).toHaveBeenCalled();
    });
  });
});
