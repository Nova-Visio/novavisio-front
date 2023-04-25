import { NgModule } from '@angular/core';
import { ChangePasswordFormComponent } from './change-password-form.component';
import { CoreModule } from 'core';

/**
 * Módulo para change password form module.
 */
@NgModule({
    declarations: [
        ChangePasswordFormComponent
    ],
    imports: [
        CoreModule
    ],
    exports: [
        ChangePasswordFormComponent
    ]
})
export class ChangePasswordFormModule { }
