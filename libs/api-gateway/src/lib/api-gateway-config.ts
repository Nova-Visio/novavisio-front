/**
 * User credentials.
 */
export interface ApiGatewayConfig {

    /** Base url de api-gateway. */
    baseUrl: string;

    /** Protocolo http. */
    protocol: string;

}

export const apiConfigProviderName = 'API_CONFIG_PROVIDER_NAME';
