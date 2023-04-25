import { JwtSession } from './jwt-session';
import { User } from './user';

/**
 * Información de la sesión de un usuario.
 */
export type UserSession = JwtSession & User;
