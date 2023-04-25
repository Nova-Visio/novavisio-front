import { NgModule } from '@angular/core';
import { CustomersService } from './customers.service';
import { CommonModule } from '@angular/common';

/**
 * Módulo para customers de gateway api.
 */
@NgModule({
  imports: [CommonModule],
  providers: [CustomersService]
})
export class CustomersModule { }
