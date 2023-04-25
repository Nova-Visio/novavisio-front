import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ChangePasswordRequest, LoginResponse } from '@novavisio/interfaces';
import { ApiGatewayConfig, apiConfigProviderName } from '../api-gateway-config';

/**
 * Administra operaciones del módulo auth de api-gateway api.
 */
@Injectable()
export class AuthService {

    /**
     * Creates an instance of auth api service.
     * @param apiConfig Configuración del api.
     * @param httpClient Administra operaciones de peticiones HTTP.
     */
    constructor(
        @Inject(apiConfigProviderName)
        private apiConfig: ApiGatewayConfig,
        private httpClient: HttpClient
    ) { }

    get baseUrl(): string {
        const baseUrl = `${this.apiConfig.protocol || 'http'}://${this.apiConfig.baseUrl}`
        return baseUrl;
    }

    /**
     * Change the password of the authenticated user.
     * @param changePasswordRequest Change password request.
     * @returns Respuesta de la petición.
     */
    public changePassword$(changePasswordRequest: ChangePasswordRequest): Observable<void> {
        const url = `${this.baseUrl}/auth/change-password`;
        return this.httpClient.put<void>(url, changePasswordRequest);
    }

    /**
     * Authentication.
     * @param username Nombre de usuario.
     * @param password  Contraseña.
     * @returns login$ Confirmación de la autenticación.
     */
    public login$(
        username: string,
        password: string
    ): Observable<{data: LoginResponse}> {
        const url = `${this.baseUrl}/auth/login`;
        return this.httpClient.post<{data: LoginResponse}>(url, { username, password });
    }
}
