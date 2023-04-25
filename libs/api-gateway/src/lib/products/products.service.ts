import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Customer, Product } from '@novavisio/interfaces';
import { ApiGatewayConfig, apiConfigProviderName } from '../api-gateway-config';


/**
 * Administra operaciones del módulo products de gateway api.
 */
@Injectable()
export class ProductsService {

  /**
   * Creates an instance of auth api service.
   * @param apiGatewayConfig Configuración del api.
   * @param httpClient Administra operaciones de peticiones HTTP.
   */
    constructor(
        @Inject(apiConfigProviderName)
        private apiGatewayConfig: ApiGatewayConfig,
        private httpClient: HttpClient
    ) { }

    get baseUrl(): string {
        const baseUrl = `${this.apiGatewayConfig.protocol || 'http:'}${this.apiGatewayConfig.baseUrl}/products`
        return baseUrl;
    }

    /**
     * Crea un usuario.
     * @param product Información del producto.
     * @returns Confirmación de la creación del usuario.
     */
    public create$(product: Product): Observable<void> {
        return this.httpClient.post<void>(this.baseUrl, product);
    }

    /**
     * Obtiene un listado de usuarios.
     * @returns Listado de usuarios.
     */
    public getAll$(): Observable<Customer[]> {
        return this.httpClient.get<Customer[]>(this.baseUrl);
    }

    /**
     * Actualiza un usuario.
     * @param customers Información del usuario.
     * @returns Confirmación de la actualización del usuario.
     */
    public update$(product: Product): Observable<void> {
        return this.httpClient.put<void>(this.baseUrl, product);
    }
}
