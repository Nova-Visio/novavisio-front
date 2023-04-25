import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from './users.service';

/**
 * Módulo para auth de gateway api.
 */
@NgModule({
  imports: [CommonModule],
  providers: [UsersService]
})
export class UsersModule { }
