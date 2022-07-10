import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class UploadImagesService {
  private url = `${environment.apiUrl}/images`;

  constructor(private _http: HttpClient) { }

  public post(form: FormData): Observable<HttpEvent<any>> {
    return this._http.post<any>(`${this.url}`, form, {reportProgress: true, observe: 'events'});
  }
}
