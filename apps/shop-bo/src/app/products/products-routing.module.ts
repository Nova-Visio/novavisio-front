import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as routesConfig from '../config/routes.config';

const routes: Routes = [
  {
    path: routesConfig.productsList,
    loadChildren: () => import('./list/products-list.module').then((m) => m.ProductsListModule),
  },
  {
    path: routesConfig.productsForm,
    loadChildren: () => import('./form/products-form.module').then((m) => m.ProductsFormModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
