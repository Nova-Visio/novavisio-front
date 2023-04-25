
/**
 * Item del menú de navegación.
 */
export interface NavItem {

    /** Clave de traducción para el item de navegación. */
    keyTranslate?: string;

    /** Nombre para identificar el item de navegación */
    name?: string;

    /** Ícono del item de navegación. */
    icon?: string;

    /** Icono del item de navegación (svg). */
    svgIcon?: string;

    /** True si el item está deshabilitado. False de lo contrario. */
    disabled?: boolean;

    /** Url de la ruta a navegar. */
    url?: string;

    /** True si el item debe dibujar un divisor. False de lo contrario. */
    divider?: boolean;

    /** Parámetros de la ruta a navegar. */
    stateParams?: { [key: string]: string | boolean | number };

    /** Badge a mostrar. */
    badge?: number;

    /** Atajo para seleccionar la opción. */
    shortcut?: string;

    /** Nombre de la imagen a mostrar en el item. */
    imgText?: string;

    /** True si la ruta a navegar es externa a la app. False de lo contrario. */
    external?: boolean;
}
