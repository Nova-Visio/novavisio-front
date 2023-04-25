import { createReducer, on, createFeature, MetaReducer } from '@ngrx/store';
import { User } from '@novavisio/interfaces';
import * as AuthActions from './auth.actions';
import { authStorageSyncReducer } from './auth-storage-sync-reducer';

export const authFeatureKey = 'auth';

export interface State {
  token: string;
  userSession: User;
  error: any;
  loading: boolean;
}

export const initialState: State = {
  token: null,
  userSession: null,
  error: null,
  loading: false
};

export const reducer = createReducer(
  initialState,

  on(AuthActions.login, state => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AuthActions.loginSuccess, (state, { userSession, token }) => ({
    ...state,
    userSession,
    loading: false,
    token,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(AuthActions.logout, (state) => ({
    ...state,
    token: null,
    userSession: null,
  })),

);
export const metaReducers: Array<MetaReducer<State, any>> = [authStorageSyncReducer];

const featureConfig = {
  name: authFeatureKey,
  reducer
}

export const authFeature = createFeature(featureConfig);
