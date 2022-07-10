// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Material
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

// 3rd libs
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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
    MatCardModule,
    FontAwesomeModule,
    SharedModule,
    ProductsRoutingModule,
  ],
  declarations: [ProductsFormComponent, ProductsListComponent],
  providers: [ProductsService],
})
export class ProductsModule {}
