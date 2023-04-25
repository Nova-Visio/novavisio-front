import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as routesConfig from '../config/routes.config';

const routes: Routes = [
  {
    path: routesConfig.customersList,
    loadChildren: () => import('./list/customers-list.module').then((m) => m.CustomersListModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
