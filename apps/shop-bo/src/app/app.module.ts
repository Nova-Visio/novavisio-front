import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { CoreModule, I18nModule } from '@novavisio/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { ApiGatewayModule } from '@novavisio/api-gateway';
import { MessengerModule } from '@novavisio/components';
import { AuthModule } from '@novavisio/auth';

import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { authConfig } from './config/auth.config';
import { apiGatewayConfig } from './config/api-gateway.config';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    HttpClientModule,
    CoreModule,
    ApiGatewayModule.forRoot(apiGatewayConfig),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    I18nModule.forRoot('es'),
    IonicModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: false,
    }),
    AuthModule.forRoot(authConfig),
    SharedModule,
    MessengerModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
