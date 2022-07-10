import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorHandlerService } from './services/error-handler.service';
import { NotificationService } from './services/notification.service';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UploadImagesComponent } from './upload-images/upload-images.component';
import { UploadImagesService } from './services/upload-images.service';

const Components = [
  DialogComponent,
  UploadImagesComponent
]

const Providers = [
  NotificationService,
  ErrorHandlerService,
  UploadImagesService
]

@NgModule({
  declarations: [
    Components,
  ],
  exports: [
    Components
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MatDialogModule
  ]
})
export class SharedModule { 
  public static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: SharedModule,
      providers: Providers
    };
  }
}
