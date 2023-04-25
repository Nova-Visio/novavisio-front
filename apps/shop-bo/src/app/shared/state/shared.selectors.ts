import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';
import { sharedFeatureKey, SharedStateModel } from './shared.state-model';
import { NavItem } from '@novavisio/components';

export const selectSharedState = createFeatureSelector<SharedStateModel>(sharedFeatureKey);

export const selectAppVersion: MemoizedSelector<SharedStateModel, string> =
    createSelector(selectSharedState, (state: SharedStateModel) => state.appVersion);

export const selectFirebaseToken: MemoizedSelector<SharedStateModel, string> =
    createSelector(selectSharedState, (state: SharedStateModel) => state.firebaseToken);

export const selectNavItems: MemoizedSelector<SharedStateModel, NavItem[]> =
    createSelector(selectSharedState, (state: SharedStateModel) => state.navItems);

export const selectOpenedSidenav: MemoizedSelector<SharedStateModel, boolean> =
    createSelector(selectSharedState, (state: SharedStateModel) => state.openedSidenav);