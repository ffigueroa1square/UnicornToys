import { NgModule } from '@angular/core';
import { ProductsListComponent } from './products-list/products-list.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductsFormComponent } from './products-form/products-form.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsListComponent
  },
  {
    path: 'new',
    component: ProductsFormComponent
  },
  {
    path: ':id',
    component: ProductsFormComponent
  }
]

@NgModule({  
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
