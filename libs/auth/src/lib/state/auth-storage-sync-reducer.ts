import { localStorageSync, LocalStorageConfig } from 'ngrx-store-localstorage';
import { Action, ActionReducer } from '@ngrx/store';
import * as fromAuth from './auth.reducer';

const INIT_ACTION = '@ngrx/store/init';
const UPDATE_ACTION = '@ngrx/store/update-reducers';

const mergeReducer = (
  state: fromAuth.State,
  rehydratedState: fromAuth.State,
  action: any
): fromAuth.State => {
  if (
    (action.type === INIT_ACTION || action.type === UPDATE_ACTION) &&
    action?.features.indexOf(fromAuth.authFeatureKey) > -1 &&
    rehydratedState
  ) {
    state = { ...fromAuth.initialState, ...rehydratedState };
  }

  return state;
};
export function authStorageSyncReducer(
  reducer: ActionReducer<fromAuth.State>
): ActionReducer<fromAuth.State> {
  const localStorageConfig: LocalStorageConfig = {
    keys: ['userSession', 'token'],
    rehydrate: true,
    mergeReducer,
  };
  return localStorageSync(localStorageConfig)(reducer);
}
