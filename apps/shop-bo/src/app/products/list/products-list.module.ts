import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsListRoutingModule } from './products-list-routing.module';
import { ProductsListComponent } from './products-list.component';
import { MasterPageModule } from '../../master-page/master-page.module';

@NgModule({
  declarations: [ProductsListComponent],
  imports: [CommonModule, ProductsListRoutingModule, MasterPageModule],
})
export class ProductsListModule {}
