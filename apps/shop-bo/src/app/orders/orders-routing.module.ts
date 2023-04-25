import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as routesConfig from '../config/routes.config';

const routes: Routes = [
  {
    path: routesConfig.ordersList,
    loadChildren: () => import('./list/orders-list.module').then((m) => m.OrdersListModule),
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
