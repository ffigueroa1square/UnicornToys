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
import { Observable } from 'rxjs';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateStubsModule } from 'src/tests/translate-stubs.module';
import { ProductsService } from '../services/products.service';

import { ProductsListComponent } from './products-list.component';

describe('ProductsListComponent', () => {
  let component: ProductsListComponent;
  let fixture: ComponentFixture<ProductsListComponent>;

  let translateService: TranslateService;
  let productsService: ProductsService;
  let errorHandlerService: ErrorHandlerService;
  let dialog: MatDialog;

  beforeEach(async () => {        
    const productsServiceSpy = jasmine.createSpyObj('ProductsService', ['getProducts', 'delete']);
    const notificationServiceSpy = jasmine.createSpyObj('NotificationService', ['success', 'error']);
    const errorHandlerSpy = jasmine.createSpyObj('ErrorHandlerService', ['handle']);    
    const dialogServiceSpy = jasmine.createSpyObj('DialogService', ['open']);    
    productsServiceSpy.getProducts = jasmine.createSpy('getProducts').and.returnValue(new Observable());

    await TestBed.configureTestingModule({
      declarations: [ ProductsListComponent ],
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
        TranslateStubsModule
      ],
      providers: [                
        { provide: ProductsService, useValue: productsServiceSpy },
        { provide: NotificationService, useValue: notificationServiceSpy },
        { provide: ErrorHandlerService, useValue: errorHandlerSpy },                
        { provide: MatDialog, useValue: dialogServiceSpy }
      ],
    })
    .compileComponents();

    translateService = TestBed.inject(TranslateService);
    productsService = TestBed.inject(ProductsService);
    errorHandlerService = TestBed.inject(ErrorHandlerService);    
    dialog = TestBed.inject(MatDialog);

    fixture = TestBed.createComponent(ProductsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
