import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Customer, CustomerFilter, PagedList } from '@novavisio/interfaces';
import { ApiGatewayConfig, apiConfigProviderName } from '../api-gateway-config';


/**
 * Administra operaciones del módulo customers de gateway api.
 */
@Injectable()
export class CustomersService {

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
        const baseUrl = `${this.apiGatewayConfig.protocol || 'http:'}${this.apiGatewayConfig.baseUrl}/customers`
        return baseUrl;
    }

    /**
     * Crea un cliente.
     * @param customer Información del cliente.
     * @returns Confirmación de la creación del cliente.
     */
    public create$(customer: Customer): Observable<void> {
        return this.httpClient.post<void>(this.baseUrl, customer);
    }

    /**
     * Obtiene un listado de clientes.
     * @returns Listado de clientes.
     */
    public getAll$(filter: CustomerFilter): Observable<PagedList<Customer>> {
        
        const queryParams: { [key: string]: string } = {
            pageIndex: `${filter.pageIndex}`,
            pageSize: `${filter.pageSize}`
        };

        if (filter.name) {
            queryParams['name'] = filter.name;
        }

         const params: HttpParams = new HttpParams({
            fromObject: {
                ...queryParams
            }
        });

        return this.httpClient.get<PagedList<Customer>>(this.baseUrl, { params });
    }

    /**
     * Actualiza un cliente.
     * @param customers Información del cliente.
     * @returns Confirmación de la actualización del cliente.
     */
    public update$(customers: Customer): Observable<void> {
        return this.httpClient.put<void>(this.baseUrl, customers);
    }
}
