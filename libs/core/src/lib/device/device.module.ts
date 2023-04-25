import { NgModule } from '@angular/core';
import { DeviceService } from './device.service';
import { LaunchNavigator } from '@awesome-cordova-plugins/launch-navigator/ngx';
import { CommonModule } from '@angular/common';

/**
 * Módulo para device.
 */
@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ],
    providers: [
        DeviceService,
        LaunchNavigator
    ]
})
export class DeviceModule { }
