import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotificationService } from './notification.service';

@Injectable()
export class ErrorHandlerService {

  constructor(private _notificationService: NotificationService) { }

  handle(errorResponse: HttpErrorResponse) {
    switch (errorResponse.status) {
      case 0:
        this._notificationService.error({ key: 'app.errors.UNREACHABLE' });
        break;
      case 400:
        if (typeof(errorResponse.error)) {
          let values = Object.values(errorResponse.error);
          let concat = Array.prototype.concat;
          let merged = concat.apply([], values);
          merged.forEach(error => {
            this._notificationService.error(error);
          });
        } else {
          this._notificationService.error({ key: 'ERRORS.BAD_REQUEST' });
        }
        break;
      case 401:        
        this._notificationService.error({ key: 'ERRORS.UNAUTHORIZED' });        
        break;
      case 403:
        this._notificationService.error({ key: 'ERRORS.FORBIDDEN' });
        break;
      case 404:
        this._notificationService.error({ key: 'ERRORS.NOT_FOUND' });
        break;
      case 422:
        this._notificationService.error({ key: 'ERRORS.UNPROCESSABLE_ENTITY' });
        break;
      case 500:
        this._notificationService.error({ key: 'ERRORS.UNKNOWN' });
        break;
      case 504:
        this._notificationService.error({ key: 'ERRORS.GATEWAY_TIMEOUT' });
        break;
      default:
        if (Array.isArray(errorResponse.error)) {
          errorResponse.error.forEach(error => {
            this._notificationService.error(error.description);
          });
        } else {
          this._notificationService.error(errorResponse.error ||
            { key: 'ERRORS.STATUS_ERROR', value: errorResponse.status });
        }
        break;
    }
  }
}
