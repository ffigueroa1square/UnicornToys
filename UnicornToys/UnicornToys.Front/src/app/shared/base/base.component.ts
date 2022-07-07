import { Injectable, OnDestroy } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { DialogComponent } from '../dialog/dialog.component';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class BaseComponent implements OnDestroy {
  componentDestroys: Subject<boolean>;
  loading: boolean;
  processing: boolean;

  constructor() {
    this.loading = false;
    this.processing = false;
    this.componentDestroys = new Subject();
  }

  ngOnDestroy(): void {
    if (this.componentDestroys) {
      this.componentDestroys.next(true);
      this.componentDestroys.complete();
    }
  }

  getErrorMessage(error: any): string | null {
    let message = error;

    if (!error) {
      return null;
    }

    if (error.ErrorMessage) {
      message = error.ErrorMessage;
    } else if (error.error) {
      message = error.error.ErrorMessage;
    } else {
      message = error;
    }

    return message as string;
  }

  showErrorMessage(error: any, notificationService: NotificationService): void {
    this.loading = false;
    this.processing = false;
    const message = this.getErrorMessage(error);

    if (message) {
      notificationService.error(message, { key: 'COMMON.ERRORMESSAGE' });
    }
  }

  showMessage(
    text: string,
    title: string,
    dialog: MatDialog,
    dialogConfig: any,
    callback?: () => void
  ): void {
    dialogConfig.data = { title: title, message: text, buttonText: 'Ok' };
    const dialogRef = dialog.open(DialogComponent, dialogConfig);

    // we are subscribing on the [mat-dialog-close] attribute as soon as we click on the dialog button
    dialogRef.afterClosed().subscribe(() => {
      if (callback) {
        callback();
      }
    });
  }

  protected emptySpace(control: AbstractControl): {
    noSpacesAround?: boolean;
    noMultipleSpaces?: boolean;
  } | null {
    const value: string = control.value || '';

    if (value.indexOf('  ') !== -1) {
      return { noMultipleSpaces: true };
    }

    return null;
  }

  protected noSpaceAround(control: AbstractControl): {
    noSpacesAround?: boolean;
    noMultipleSpaces?: boolean;
  } | null {
    const value: string = control.value || '';
    const firstChar = value[0];
    const lastChar = value[value.length - 1];

    if (firstChar === ' ' || lastChar === ' ') {
      return { noSpacesAround: true };
    }

    return null;
  }
}
