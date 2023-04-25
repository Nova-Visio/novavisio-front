import { createAction, props } from '@ngrx/store';
import { NavItem } from '@novavisio/components';
import { sharedFeatureKey } from './shared.state-model';

const key = `[${sharedFeatureKey}]`;

/** Define los items de navegación del menú. */
export const setNavItems = createAction(
  `${key} set nav items`,
  props<{ navItems: NavItem[] }>()
);

/** Redirije a la ruta anterior. */
export const goBack = createAction(
  `${key} go back`
);

/** Define si el sidenav se muestra o se oculta. */
export const setOpenedSidenav = createAction(
  `${key} set opened sidenav`,
  props<{ opened: boolean }>()
);

/** Agrega una ruta a la navefación de back button. */
export const addBackRoute = createAction(
  `${key} add back route`,
  props<{ route: string }>()
);

/** Setea el token de firebase que identifica el dispositivo. */
export const setFirebaseToken = createAction(
  `${key} set firebase token`,
  props<{ firebaseToken: string }>()
);