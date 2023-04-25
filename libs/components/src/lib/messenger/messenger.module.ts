import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { MessengerComponent } from './messenger.component';
import { MessengerService } from './messenger.service';

/**
 * Módulo para messenger.
 */
@NgModule({
    declarations: [MessengerComponent],
    imports: [CommonModule, AngularMaterialModule],
    providers: [MessengerService],
})
export class MessengerModule { }
