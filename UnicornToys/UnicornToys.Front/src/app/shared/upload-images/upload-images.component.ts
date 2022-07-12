import { HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ErrorHandlerService } from '../services/error-handler.service';
import { UploadImagesService } from '../services/upload-images.service';

@Component({
  selector: 'app-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.scss']
})
export class UploadImagesComponent implements OnInit {
  public progress: number = 0;
  public message?: string = undefined;
  @Output() public onUploadFinished: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private _uploadImagesService: UploadImagesService,
    private _errorHandler: ErrorHandlerService
    ) { }

  ngOnInit(): void {
  }

  uploadFile = (files: any) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    
    this._uploadImagesService.post(formData)
      .subscribe({
        next: (event) => {
        if (event.type === HttpEventType.UploadProgress)
          if (event.total) {
            const total: number = event.total;
            this.progress = Math.round(100 * event.loaded / total);
          } else {
            this.progress = 0;
          }
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
        }
      },
      error: errorResponse => {
        this._errorHandler.handle(errorResponse);
      }
    });
  }
}
