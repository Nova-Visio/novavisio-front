import { createReducer, on, createFeature } from '@ngrx/store';
import { customersFiltersDefault } from '../../config/customers-filter-default.config';
import { Customer, CustomerFilter, HttpApiError } from '@novavisio/interfaces';
import * as CustomersActions from './customers.actions';

export const customersFeatureKey = 'customers';

export interface State {
    results: Customer[];
    filteredResults: Customer[];
    totalResults: number
    filter: CustomerFilter;
    errors: {
        get: HttpApiError;
        create: HttpApiError;
    },
    loadings: {
        get: boolean;
        create: boolean;
    }
}

export const initialState: State = {
    results: [],
    filteredResults: [],
    totalResults: null,
    filter: customersFiltersDefault,
    errors: {
        get: null,
        create: null
    },
    loadings: {
        get: false,
        create: false
    }
};

export const reducer = createReducer(
  initialState,

  on(CustomersActions.getCustomers, state => ({
    ...state,
      loading: {
          ...state.loadings,
          get: true
    },
    error: null,
  })),
    on(CustomersActions.getCustomersSuccess, (state, response) => ({
    ...state,
        loading: {
            ...state.loadings,
            get: false
        },
        results: response.results
  })),
  on(CustomersActions.getCustomersFailure, (state, { error }) => ({
    ...state,
      errors: {
          ...state.errors,
          get: error
    },
    error,
  })),
//   on(CustomersActions.logout, (state) => ({
//     ...state,
//     token: null,
//     userSession: null,
//   })),

);

const featureConfig = {
  name: customersFeatureKey,
  reducer
}

export const customerFeature = createFeature(featureConfig);
