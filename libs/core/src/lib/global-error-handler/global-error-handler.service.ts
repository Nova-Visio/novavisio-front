import { Injectable, ErrorHandler, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GlobalErrorHandlerConfig } from './global-error-handler-config';
import { EMPTY, Observable } from 'rxjs';

/**
 * Administra operaciones de errores.
 */
@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {

    /**
     * Creates an instance of global error handler service.
     * @param translateService Administra operaciones de i18n.
     * @param messengerService Administra las operaciones del módulo Messenger.
     * @param enableLog True si se debe logear el error. False de lo contrario.
     */
    constructor(
        private translateService: TranslateService,
        @Inject('globalErrorHandlerConfig')
        private globalErrorHandlerConfig: GlobalErrorHandlerConfig
    ) { }

    /**
     * Realiza el tratamiento genérico del error y muestra un mensaje asociado.
     * @param error Error.
     */
    /* eslint-disable-next-line */
    public handleError(error: any): Observable<void> {
        /**
         * FIX: al NO controlar una excepción en la implementación de un @Action la excepción es
         * lanzada dos veces por NGXS, una se maneja al realizar el disparch de la acciónen (component), y otra en este servicio.
         * Para evitar mostrar dos mensajes de error, se excluyen de este servicio los errores en
         * Peticiones HTTP ya que se asume que las acciones que realizar request, controlan el error y en caso de
         * que no lo traten, lo vuelven a lanzar.
         * Ref: https://github.com/ngxs/store/issues/803
         * Probablemente se resuelva en la versión 4 de NGXS.
         * Ref: https://github.com/ngxs/store/issues/1691
         */
        const isDefinedHandle: boolean = typeof error?.handle === 'boolean';
        const hasStatusCode: boolean = typeof error?.status === 'number';
        const handleError: boolean = (isDefinedHandle && error?.handle) || (!isDefinedHandle && !hasStatusCode);
        if (handleError) {
            if (this.globalErrorHandlerConfig.enableLogs) {
                console.error(error);
            }
            // TODO: Mostrar error con un servicio injectado por config.
            return EMPTY;
        } else {
            return EMPTY;
        }
    }



    /**
     * Genera UUID.
     * @returns Falta definición.
     */
    public generateUUID(): string {
        let d: number = new Date().getTime();
        // eslint-disable-next-line
        if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
            // Use high-precision timer if available
            d += performance.now();
        }

        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c: string) => {
            // eslint-disable-next-line no-bitwise
            const r: number = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);

            // eslint-disable-next-line no-bitwise
            return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
        });
    }
}
