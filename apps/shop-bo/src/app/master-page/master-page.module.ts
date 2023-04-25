import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterPageComponent } from './master-page.component';
import { AngularMaterialModule } from '@novavisio/components';
import { DeviceModule, I18nModule } from '@novavisio/core';

@NgModule({
  declarations: [MasterPageComponent],
  imports: [CommonModule, AngularMaterialModule, DeviceModule, I18nModule],
  exports: [MasterPageComponent],
})
export class MasterPageModule {}
