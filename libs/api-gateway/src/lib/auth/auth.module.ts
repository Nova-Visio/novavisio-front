import { NgModule } from '@angular/core';
import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common';

/**
 * Módulo para auth de api-gateway api.
 */
@NgModule({
  imports: [CommonModule],
  providers: [AuthService]
})
export class AuthModule { }
