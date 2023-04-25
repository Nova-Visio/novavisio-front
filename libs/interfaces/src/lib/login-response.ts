import { User } from "./user";

/**
 * User credentials.
 */
export interface LoginResponse {

    /** Nombre de usuario. */
    jwt: string;

    /** Contraseña. */
    user: User;
}
