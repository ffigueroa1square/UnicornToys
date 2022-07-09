import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { faMinusCircle, faPencilSquare } from '@fortawesome/free-solid-svg-icons';
import { lastValueFrom } from 'rxjs';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { AppResources } from 'src/app/shared/models/app-resources';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
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
    private _notificationService: NotificationService,
    private _productsService: ProductsService,
    private _errorHandler: ErrorHandlerService,
    private _router: Router,
    private _activatedRouter: ActivatedRoute,
    private dialog: MatDialog,) { }

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

  async openModal(productId: number, productName: string) : Promise<void> {
    const dialogConfig = new MatDialogConfig();

    // Create modal configuration
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      title: AppResources.getMessage('PRODUCTS.DELETE_PRODUCT'),
      message: `${AppResources.getMessage('PRODUCTS.DELETE_MESSAGE_CONFIRMATION')}${productName}?`,
      cancelText: AppResources.getMessage('COMMON.CANCEL'),
      confirmText: AppResources.getMessage('COMMON.DELETE')
    };

    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);
    const result = await lastValueFrom(dialogRef.afterClosed(), {defaultValue: false});

    if(result) {
      this.deleteProduct(productId);
    }
  }

  async deleteProduct(productId: number) : Promise<void> {
    this._productsService.delete(productId.toString())
    .subscribe({
      next: (response: boolean) => {
        if(response) {
          this._notificationService.success({ key: 'COMMON.SAVE_SUCCESS' });
          this.getProducts();
        } else {
          this._notificationService.error({ key: 'COMMON.SOMETHING_WRONG' });
        }
      }
    });
  }
}
