import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActiveToast, IndividualConfig, ToastrService } from 'ngx-toastr';
import { forkJoin, map, Observable, of, delay } from 'rxjs';
import { Resource } from '../models/resource.model';
import { makeHot } from '../util/observable';

type ToasterFn = (message: string, title?: string, options?: Partial<IndividualConfig>) => ActiveToast<any>;

@Injectable()
export class NotificationService {
  constructor(
    private _toastr: ToastrService,
    private _translate: TranslateService
  ) { }

  public success(message: string | Resource, title?: string | Resource, options?: Partial<IndividualConfig>): Observable<ActiveToast<any>> {
    return this.show(this._toastr.success, message, title, options);
  }

  public info(message: string | Resource, title?: string | Resource, options?: Partial<IndividualConfig>): Observable<ActiveToast<any>> {
    return this.show(this._toastr.info, message, title, options);
  }

  public warning(message: string | Resource, title?: string | Resource, options?: Partial<IndividualConfig>): Observable<ActiveToast<any>> {
    return this.show(this._toastr.warning, message, title, options);
  }

  public error(message: string | Resource, title?: string | Resource, options?: Partial<IndividualConfig>): Observable<ActiveToast<any>> {
    return this.show(this._toastr.error, message, title, options);
  }

  public clearToasts(): void {
    this._toastr.clear();
  }

  private show(fn: ToasterFn,
    message: string | Resource,
    title?: string | Resource,
    options?: Partial<IndividualConfig>): Observable<ActiveToast<any>> {

      const obs = forkJoin([this.getMessage(message), this.getMessage(title)])
      .pipe(
        // Need to add this delay to ensure the observable will run asynchronously
        delay(10),
        map(results => {
          // Need to bind 'this' context to the toaster object
          const toast = fn.bind(this._toastr);
          return toast(results[0], results[1], options);
        }));    

        return makeHot(obs);
  }

  private getMessage(message?: string | Resource): Observable<string> {
    if (message === null || message === undefined) {
      return of('');
    }

    if (typeof message === 'string') {
      return this._translate.get(message);
    }

    let key = message['key'];
    let value = message['value'] || {};
    return this._translate.get(key, {value});
  }
}