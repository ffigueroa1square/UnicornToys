// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Material
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';

// 3rd libs
import { TranslateModule } from '@ngx-translate/core';

// App
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsRoutingModule } from './products-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProductsService } from './services/products.service';
import { ProductsFormComponent } from './products-form/products-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MatTableModule,
    MatInputModule,
    SharedModule,
    ProductsRoutingModule,
  ],
  declarations: [ProductsFormComponent, ProductsListComponent],
  providers: [ProductsService],
})
export class ProductsModule {}
