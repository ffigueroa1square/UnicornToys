import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { faMinusCircle, faPencilSquare } from '@fortawesome/free-solid-svg-icons';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  public displayedColumns: string[] = ['Id', 'Name', 'AgeRestriction', 'Price', 'Company', 'Actions'];
  public dataSource!: MatTableDataSource<Product>;
  public isLoading = false;
  public faPencilSquare = faPencilSquare;
  public faMinusCircle = faMinusCircle;

  constructor(
    private _productsService: ProductsService,
    private _errorHandler: ErrorHandlerService,
    private _router: Router,
    private _activatedRouter: ActivatedRoute,) { }

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

  editRedirect(productId: number): void {
    this._router.navigate(['./', productId], { relativeTo: this._activatedRouter });
  }
}
