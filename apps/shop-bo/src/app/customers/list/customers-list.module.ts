import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersListRoutingModule } from './customers-list-routing.module';
import { CustomersListComponent } from './customers-list.component';
import { MasterPageModule } from '../../master-page/master-page.module';

@NgModule({
  declarations: [CustomersListComponent],
  imports: [CommonModule, CustomersListRoutingModule, MasterPageModule],
})
export class CustomersListModule {}
