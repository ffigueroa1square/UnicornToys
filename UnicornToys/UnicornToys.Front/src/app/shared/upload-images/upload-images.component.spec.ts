import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateStubsModule } from 'src/tests/translate-stubs.module';
import { ErrorHandlerService } from '../services/error-handler.service';
import { UploadImagesService } from '../services/upload-images.service';
import { SharedModule } from '../shared.module';

import { UploadImagesComponent } from './upload-images.component';

describe('UploadImagesComponent', () => {
  let component: UploadImagesComponent;
  let fixture: ComponentFixture<UploadImagesComponent>;

  let translateService: TranslateService;
  let uploadImageService: UploadImagesService;
  let errorHandlerService: ErrorHandlerService;

  beforeEach(async () => {    
    const uploadImageServiceSpy = jasmine.createSpyObj('UploadImageService', ['post']);
    const errorHandlerSpy = jasmine.createSpyObj('ErrorHandlerService', ['handle']);    

    await TestBed.configureTestingModule({
      declarations: [ UploadImagesComponent ],
      imports:[
        TranslateModule.forRoot(),
        SharedModule,
        BrowserAnimationsModule,
        HttpClientModule,
        TranslateStubsModule
      ],
      providers: [        
        { provide: UploadImagesService, useValue: uploadImageServiceSpy },
        { provide: ErrorHandlerService, useValue: errorHandlerSpy },
      ]
    })
    .compileComponents();

    translateService = TestBed.inject(TranslateService);
    errorHandlerService = TestBed.inject(ErrorHandlerService);
    uploadImageService = TestBed.inject(UploadImagesService);

    fixture = TestBed.createComponent(UploadImagesComponent);    
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
