import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorHandlerService } from './services/error-handler.service';
import { NotificationService } from './services/notification.service';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

const Components = [
  DialogComponent
]

const Providers = [
  NotificationService,
  ErrorHandlerService
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
