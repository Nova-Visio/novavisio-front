import { createAction, props } from '@ngrx/store';
import { Credentials, HttpApiError, User } from '@novavisio/interfaces';

const key = '[Auth]';

export const login = createAction(
  `${key} Login`,
  props<Credentials>()
);

export const loginSuccess = createAction(
  `${key} Login success`,
  props<{ token: string; userSession: User }>()
);

export const loginFailure = createAction(
  `${key} Login failure`,
  props<{ error: HttpApiError }>()
);

export const logout = createAction(`${key} Logout`);
