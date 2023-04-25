import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '@novavisio/interfaces';
import { ApiGatewayConfig, apiConfigProviderName } from '../api-gateway-config';


/**
 * Administra operaciones del módulo users de gateway api.
 */
@Injectable()
export class UsersService {

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
        const baseUrl = `${this.apiGatewayConfig.protocol || 'http:'}${this.apiGatewayConfig.baseUrl}/users`
        return baseUrl;
    }

    /**
     * Crea un usuario.
     * @param user Información del usuario.
     * @returns Confirmación de la creación del usuario.
     */
    public create$(user: User): Observable<void> {
        return this.httpClient.post<void>(this.baseUrl, user);
    }
    
    /**
     * Obtiene un listado de usuarios.
     * @returns Listado de usuarios.
     */
    public getAll$(): Observable<User[]> {
        return this.httpClient.get<User[]>(this.baseUrl);
    }

    /**
     * Actualiza un usuario.
     * @param user Información del usuario.
     * @returns Confirmación de la actualización del usuario.
     */
    public update$(user: User): Observable<void> {
        return this.httpClient.put<void>(this.baseUrl, user);
    }
}
