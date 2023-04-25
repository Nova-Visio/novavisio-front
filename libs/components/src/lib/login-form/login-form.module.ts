import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { LoginFormComponent } from './login-form.component';

/**
 * Módulo para login form.
 */
@NgModule({
    declarations: [
        LoginFormComponent
    ],
    imports: [
        CommonModule,
        AngularMaterialModule,
        TranslateModule
    ],
    exports: [
        LoginFormComponent
    ]
})
export class LoginFormModule { }
