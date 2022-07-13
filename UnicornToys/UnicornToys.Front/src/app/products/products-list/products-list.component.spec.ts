import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { defer, Observable, throwError } from 'rxjs';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateStubsModule } from 'src/tests/translate-stubs.module';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';

import { ProductsListComponent } from './products-list.component';

describe('ProductsListComponent', () => {
  let component: ProductsListComponent;
  let fixture: ComponentFixture<ProductsListComponent>;

  let translateService: TranslateService;
  let notificationService: NotificationService;
  let productsService: ProductsService;
  let errorHandlerService: ErrorHandlerService;
  let dialog: MatDialog;

  beforeEach(async () => {
    const productsServiceSpy = jasmine.createSpyObj('ProductsService', [
      'getProducts',
      'delete',
    ]);
    const notificationServiceSpy = jasmine.createSpyObj('NotificationService', [
      'success',
      'error',
    ]);
    const errorHandlerSpy = jasmine.createSpyObj('ErrorHandlerService', [
      'handle',
    ]);
    const dialogServiceSpy = jasmine.createSpyObj('DialogService', ['open']);
    productsServiceSpy.getProducts = jasmine
      .createSpy('getProducts')
      .and.returnValue(new Observable());

    await TestBed.configureTestingModule({
      declarations: [ProductsListComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        TranslateModule.forRoot(),
        MatTableModule,
        MatCardModule,
        FontAwesomeModule,
        MatDialogModule,
        SharedModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterTestingModule,
        TranslateStubsModule,
      ],
      providers: [
        { provide: ProductsService, useValue: productsServiceSpy },
        { provide: NotificationService, useValue: notificationServiceSpy },
        { provide: ErrorHandlerService, useValue: errorHandlerSpy },
        { provide: MatDialog, useValue: dialogServiceSpy },
      ],
    }).compileComponents();

    translateService = TestBed.inject(TranslateService);
    productsService = TestBed.inject(ProductsService);
    errorHandlerService = TestBed.inject(ErrorHandlerService);
    notificationService = TestBed.inject(NotificationService);
    dialog = TestBed.inject(MatDialog);

    fixture = TestBed.createComponent(ProductsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get a products list', async () => {
    // Arrange
    const expected: Product[] = [
      {
        id: 1,
        name: 'product 1',
        description: 'description 1',
        ageRestriction: 10,
        company: 'company test 1',
        price: 10,
        imageName: '',
        imageLocation: '',
      },
      {
        id: 2,
        name: 'product 2',
        description: 'description 2',
        ageRestriction: 20,
        company: 'company test 2',
        price: 20,
        imageName: '',
        imageLocation: '',
      },
    ];

    productsService.getProducts = jasmine
      .createSpy('getProducts')
      .and.returnValue(defer(() => Promise.resolve(expected)));

    // Act
    component.getProducts();

    // Assert
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.dataSource.data.length).toEqual(2);
    });
  });

  it('should throw error value when get a product list', async () => {
    // Arrange
    productsService.getProducts = jasmine
      .createSpy('getProducts')
      .and.returnValue(throwError(() => new Error('error')));

    // Act
    component.getProducts();

    // Assert
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(errorHandlerService.handle).toHaveBeenCalled();
    });
  });

  it('should return true value when delete a product', async () => {
    // Arrange
    const productId = 1;
    productsService.delete = jasmine
      .createSpy('deleteProduct')
      .and.returnValue(defer(() => Promise.resolve(true)));

    // Act
    component.deleteProduct(productId);

    // Assert
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(notificationService.success).toHaveBeenCalled();
    });
  });

  it('should return false value when delete a product', async () => {
    // Arrange
    const productId = 1;
    productsService.delete = jasmine
      .createSpy('deleteProduct')
      .and.returnValue(defer(() => Promise.resolve(false)));

    // Act
    component.deleteProduct(productId);

    // Assert
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(notificationService.error).toHaveBeenCalled();
    });
  });

  it('should throw error value when delete a product', async () => {
    // Arrange
    const productId = 1;
    productsService.delete = jasmine
      .createSpy('deleteProduct')
      .and.returnValue(throwError(() => new Error('error')));

    // Act
    component.deleteProduct(productId);

    // Assert
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(errorHandlerService.handle).toHaveBeenCalled();
    });
  });
});
