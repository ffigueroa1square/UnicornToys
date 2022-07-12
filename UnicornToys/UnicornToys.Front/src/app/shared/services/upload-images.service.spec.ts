import { HttpClient } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';

import { UploadImagesService } from './upload-images.service';

describe('UploadImagesService', () => {
  let service: UploadImagesService;
  let http: HttpClient;

  beforeEach(() => {
    const httpSpy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [
        UploadImagesService,
        { provide: HttpClient, useValue: httpSpy }
      ]
    });
    http = TestBed.inject(HttpClient);
    service = TestBed.inject(UploadImagesService);
  });

  it('should be created', inject([UploadImagesService], (service: UploadImagesService) => {
    expect(service).toBeTruthy();
  }));
});
