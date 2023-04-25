import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreService } from './core.service';


@NgModule({
  imports: [CommonModule],
  providers: [CoreService],
  exports: [CommonModule],
})
export class CoreModule { }
