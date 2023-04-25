import { createReducer, on, createFeature } from '@ngrx/store';
import { SharedStateModel, sharedFeatureKey } from './shared.state-model';
import * as SharedActions from './shared.actions';

export const initialState: SharedStateModel = {
  appVersion: '1.0.0',
  backRoutes: [],
  firebaseToken: null,
  navItems: [],
  openedSidenav: false
};

export const reducer = createReducer(
  initialState,

  on(SharedActions.setNavItems, (state, { navItems}) => ({
    ...state,
    navItems
  })),
  on(SharedActions.setOpenedSidenav, (state, { opened: openedSidenav }) => ({
    ...state,
    openedSidenav
  })),
  on(SharedActions.setFirebaseToken, (state, { firebaseToken }) => ({
    ...state,
    firebaseToken
  })),
  on(SharedActions.addBackRoute, (state, { route }) => ({
    ...state,
      addBackRoute: [
        ...state.backRoutes,
        route
    ]
  })),
);

const featureConfig = {
  name: sharedFeatureKey,
  reducer
}

export const sharedFeature = createFeature(featureConfig);
