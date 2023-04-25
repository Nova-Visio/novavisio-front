import { NavItem } from '@novavisio/components';

/**
 * Modelo que representa el estado del módulo shared.
 */
export interface SharedStateModel {

    /** Items del menú de navegación. */
    navItems: NavItem[];

    /** Verisón de la aplicación. */
    appVersion: string;

    /** Ruta anterior en la navegación */
    backRoutes: string[];

    /** True si el sidenav debe estar abierto. False de lo contrario. */
    openedSidenav: boolean;

    /** Firebase token. */
    firebaseToken: string;
}

export const sharedFeatureKey = 'shared';
