import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateFakeLoader, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { MockActivatedRoute } from 'src/tests/mock-active-router';
import { ProductsService } from '../services/products.service';
import { RouterTestingModule } from '@angular/router/testing';

import { ProductsFormComponent } from './products-form.component';
import { UploadImagesComponent } from 'src/app/shared/upload-images/upload-images.component';
import { UploadImagesService } from 'src/app/shared/services/upload-images.service';
import { Observable } from 'rxjs';
import { SharedModule } from 'src/app/shared/shared.module';
import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { TranslateStubsModule } from 'src/tests/translate-stubs.module';

describe('ProductsFormComponent', () => {
  let component: ProductsFormComponent;
  let fixture: ComponentFixture<ProductsFormComponent>;

  let translateService: TranslateService;
  let productsService: ProductsService;
  let errorHandlerService: ErrorHandlerService;
  //let activatedRouteStub: MockActivatedRoute;
  let uploadImageService: UploadImagesService;
  let router: Router;

  beforeEach(async () => {
    //activatedRouteStub = new MockActivatedRoute();

    const formBuilder: FormBuilder = new FormBuilder();
    const translateServiceSpy = jasmine.createSpyObj('TranslateService', ['get']);
    const productsServiceSpy = jasmine.createSpyObj('ProductsService', ['get', 'post', 'put']);
    const notificationServiceSpy = jasmine.createSpyObj('NotificationService', ['success', 'error']);
    const errorHandlerSpy = jasmine.createSpyObj('ErrorHandlerService', ['handle']);
    const uploadImageServiceSpy = jasmine.createSpyObj('UploadImageService', ['post']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    translateServiceSpy.get = jasmine.createSpy('get').and.returnValue(new Observable()); 

    @Pipe({ name: 'translate' })
    class MockTranslatePipe implements PipeTransform {
      transform(value: any): any {
        // Do stuff here, if you want
        return value;
      }
    }

    await TestBed.configureTestingModule({
      declarations: [ 
        ProductsFormComponent, 
        UploadImagesComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        TranslateModule.forRoot(),
        MatInputModule,
        SharedModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterTestingModule,
        TranslateStubsModule
      ],
      providers: [
        { provide: FormBuilder, useValue: formBuilder },
        //{ provide: ActivatedRoute, useValue: activatedRouteStub },
        //{ provide: TranslateService, useClass: TranslationServiceStub },
        { provide: ProductsService, useValue: productsServiceSpy },
        { provide: NotificationService, useValue: notificationServiceSpy },
        { provide: ErrorHandlerService, useValue: errorHandlerSpy },
        { provide: UploadImagesService, useValue: uploadImageServiceSpy },
        //{ provide: Router, useValue: routerSpy },
      ],
    })
    .compileComponents();

    translateService = TestBed.inject(TranslateService);
    productsService = TestBed.inject(ProductsService);
    errorHandlerService = TestBed.inject(ErrorHandlerService);
    uploadImageService = TestBed.inject(UploadImagesService);
    //router = TestBed.inject(Router);
    fixture = TestBed.createComponent(ProductsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
