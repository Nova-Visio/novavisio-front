import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersListRoutingModule } from './orders-list-routing.module';
import { OrdersListComponent } from './orders-list.component';
import { MasterPageModule } from '../../master-page/master-page.module';

@NgModule({
  declarations: [OrdersListComponent],
  imports: [CommonModule, OrdersListRoutingModule, MasterPageModule],
})
export class OrdersListModule {}
