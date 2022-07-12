import { inject, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;
  let translateService: TranslateService;
  let toastrService: ToastrService;

  beforeEach(() => {
    const translateServiceSpy = jasmine.createSpyObj('TranslateService', ['get']);
    const toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['success', 'info', 'warning', 'error']);

    translateServiceSpy.get = jasmine.createSpy('get').and.returnValue(new Observable());
    
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
      ],
      providers: [
        NotificationService,
        {
          provide: TranslateService, useValue: translateServiceSpy
        },
        {
          provide: ToastrService, useValue: toastrServiceSpy
        }
      ]
    }).compileComponents();
    toastrService = TestBed.inject(ToastrService);
    translateService = TestBed.inject(TranslateService);
    service = TestBed.inject(NotificationService);
  });

  it('should be created', inject([NotificationService], (service: NotificationService) => {
    expect(service).toBeTruthy();
  }));
});
