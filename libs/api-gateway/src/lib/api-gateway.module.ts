import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ApiGatewayConfig, apiConfigProviderName } from './api-gateway-config';

@NgModule({
  imports: [CommonModule, AuthModule, UsersModule],
})
export class ApiGatewayModule {

  /**
   * Método para la configuración inicial del módulo.
   * @param apiConfig Configuración de la app.
   * @returns Módulo configurado.
   */
  public static forRoot(apiConfig: ApiGatewayConfig): ModuleWithProviders<ApiGatewayModule> {

        return {
            ngModule: ApiGatewayModule,
            providers: [
              {
                  provide: apiConfigProviderName,
                  useValue: apiConfig
              },
            ]
        };
    }
}
