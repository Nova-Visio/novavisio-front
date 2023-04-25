import { NgModule, ErrorHandler, ModuleWithProviders } from '@angular/core';
import { GlobalErrorHandlerService } from './global-error-handler.service';
import { GlobalErrorHandlerConfig } from './global-error-handler-config';
import { CoreModule } from '../core.module';

/**
 * Módulo para global error hanlder.
 */
@NgModule({
    imports: [CoreModule],
})
export class GlobalErrorHandlerModule {
    /**
     * Falta definición.
     * @param globalErrorHandlerConfig Falta definición.
     * @returns  Falta definición.
     */
    public static forRoot(
        globalErrorHandlerConfig: GlobalErrorHandlerConfig
    ): ModuleWithProviders<GlobalErrorHandlerModule> {
        return {
            ngModule: GlobalErrorHandlerModule,
            providers: [
                GlobalErrorHandlerService,
                {
                    provide: ErrorHandler,
                    useClass: GlobalErrorHandlerService,
                },
                {
                    provide: 'globalErrorHandlerConfig',
                    useValue: globalErrorHandlerConfig,
                },
            ],
        };
    }
}
