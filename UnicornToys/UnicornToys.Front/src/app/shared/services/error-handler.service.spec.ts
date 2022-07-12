import { TestBed } from '@angular/core/testing';

import { ErrorHandlerService } from './error-handler.service';
import { NotificationService } from './notification.service';

describe('ErrorHandlerService', () => {
  let notificationService: NotificationService;
  let service: ErrorHandlerService;

  beforeEach(() => {
    const notificationServiceSpy = jasmine.createSpyObj('NotificationService', ['error']);
    TestBed.configureTestingModule({
      providers: [
        ErrorHandlerService,
        {
          provide: NotificationService, useValue: notificationServiceSpy
        }
      ]
    }).compileComponents();
    notificationService = TestBed.inject(NotificationService);
    service = TestBed.inject(ErrorHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
