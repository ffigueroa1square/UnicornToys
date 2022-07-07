import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  public displayedColumns: string[] = ['Id', 'Name', 'AgeRestriction', 'Price', 'Company'];
  public dataSource!: MatTableDataSource<Product>;
  public isLoading = false;

  constructor(
    private _productsService: ProductsService,
    private _errorHandler: ErrorHandlerService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.isLoading = true;
    this._productsService.getProducts()
    .subscribe({
      next: (result: Product[]) => {
          this.dataSource = new MatTableDataSource(result);
          this.isLoading = false;
        },
      error: errorResponse => {
        this.isLoading = false;
        this._errorHandler.handle(errorResponse);
      }
    });
  }
}
