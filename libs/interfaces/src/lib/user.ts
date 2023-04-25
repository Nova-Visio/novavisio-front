import { UserRole } from './user-role';

/**
 * Información del usuario.
 */
export interface User {

    /** Nombre del usuario */
    username: string;

    /** Nombre. */
    firstname: string;

    /** Apellido. */
    lastname: string;

    /** email del Usuario. */
    email: string;

    /** Foto del usuario. */
    role: UserRole;

    /** Foto del usuario. */
    picture?: string;
}
