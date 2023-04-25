import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';
import { User } from '@novavisio/interfaces';
import * as fromAuth from './auth.reducer';

export const selectAuthState = createFeatureSelector<fromAuth.State>(
  fromAuth.authFeatureKey
);

export const selectToken: MemoizedSelector<fromAuth.State, string> =
  createSelector(selectAuthState, (state: fromAuth.State) => state.token);

export const selectUserSession: MemoizedSelector<fromAuth.State, User> =
  createSelector(selectAuthState, (state: fromAuth.State) => state.userSession);

export const selectUsername: MemoizedSelector<fromAuth.State, string> =
  createSelector(selectAuthState, (state: fromAuth.State) => state.userSession?.username || 'Usuario mockeado');

  export const selectUserEmail: MemoizedSelector<fromAuth.State, string> =
  createSelector(selectAuthState, (state: fromAuth.State) => state.userSession?.email || 'mail@mockeado.com');

export const selectLoading: MemoizedSelector<fromAuth.State, boolean> =
  createSelector(selectAuthState, (state: fromAuth.State) => state.loading);

export const selectError: MemoizedSelector<fromAuth.State, any> =
  createSelector(selectAuthState, (state: fromAuth.State) => state.error);
