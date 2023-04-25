import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { AngularMaterialModule, LoginFormModule } from '@novavisio/components';
import { I18nModule } from '@novavisio/core';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    LoginFormModule,
    I18nModule.forFeature('login'),
    AngularMaterialModule
  ],
})
export class LoginModule {}
