import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { EnvironmentModule } from '@novavisio/core';
import { AuthModule as AuthApiModule } from '@novavisio/api-gateway';
import { AuthEffects } from './state/auth.effects';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { AuthConfig } from './auth-config';
import { AuthInterceptor } from './auth.interceptor';
import * as fromAuth from './state/auth.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducer, {
      metaReducers: fromAuth.metaReducers,
    }),
    AuthApiModule,
    EffectsModule.forFeature([AuthEffects]),
    EnvironmentModule
  ]
})
export class AuthModule {
  public static forRoot(
    authConfig: AuthConfig
  ): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [
        {
          provide: 'authConfig',
          useValue: authConfig,
        },
        AuthInterceptor,
        AuthGuard,
        AuthService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        },
      ],
    };
  }
}
