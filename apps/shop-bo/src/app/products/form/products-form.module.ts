import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsFormComponent } from './products-form.component';
import { ProductsFormRoutingModule } from './products-form-routing.module';
import { MasterPageModule } from '../../master-page/master-page.module';

@NgModule({
  declarations: [ProductsFormComponent],
  imports: [CommonModule, ProductsFormRoutingModule, MasterPageModule],
})
export class ProductsFormModule {}
