import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { StoreModule } from '@ngrx/store';
import * as fromCustomers from './state/customers.reducer';

@NgModule({
  declarations: [],
  imports: [CommonModule, CustomersRoutingModule, StoreModule.forFeature(fromCustomers.customersFeatureKey, fromCustomers.reducer)],
})
export class CustomersModule {}
