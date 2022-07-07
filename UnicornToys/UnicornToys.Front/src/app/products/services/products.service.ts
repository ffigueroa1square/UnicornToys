import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Product } from "../models/product.model";
import { ProductDto } from "../models/productDto.model";

@Injectable()
export class ProductsService {
    private url = `${environment.apiUrl}/products`;
    
    constructor(private _http: HttpClient) { }

    public getProducts() : Observable<Product[]> {
        return this._http.get<Product[]>(`${this.url}`);
    }

    public get(id: string): Observable<Product> {
        return this._http.get<Product>(`${this.url}/${id}`);
    }

    public post(entity: ProductDto): Observable<any> {
        return this._http.post<any>(`${this.url}`, entity);
    }

    public put(id: string, entity: Product): Observable<any> {
        return this._http.put<any>(`${this.url}/${id}`, entity);
    }

    public delete(id: string): Observable<any> {
        return this._http.delete<any>(`${this.url}/${id}`);
      }
}