/**
 * Constantes para códigos de error de Excepciones y StatusMessage (api).
 */
export enum ApiErrorCodes {
    /** Credenciales inválidas. */
    ErrAuthInvalidCredentials = 'ERR.AUTH.INVALIDCREDENTIALS',

    /** AccessToken inválido. */
    ErrAuthAccessTokenInvalid = 'ERR.AUTH.ACCESSTOKEN.INVALID',

    /** AccessToken vencido. */
    ErrAuthAccessTokenExpired = 'ERR.AUTH.ACCESSTOKEN.EXPIRED',
}
