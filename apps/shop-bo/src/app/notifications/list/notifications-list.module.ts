import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationsListRoutingModule } from './notifications-list-routing.module';
import { NotificationsListComponent } from './notifications-list.component';


@NgModule({
  declarations: [NotificationsListComponent],
  imports: [
    CommonModule,
    NotificationsListRoutingModule
  ]
})
export class NotificationsListModule { }
