/**
 * Información de la sesión de un usuario.
 */
export interface JwtSession {

    /** identificador del usuario. */
    sub: string;

    /** IAT. */
    iat: string;

    /** Role del usuario. */
    exp: number;
}
