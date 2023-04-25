import { NgModule } from '@angular/core';
import { ProductsService } from './products.service';
import { CommonModule } from '@angular/common';

/**
 * Módulo para products de gateway api.
 */
@NgModule({
  imports: [CommonModule],
  providers: [ProductsService]
})
export class ProductsModule { }
