import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';
import * as fromCustomers from './customers.reducer';
import { Customer, CustomerFilter, HttpApiError } from '@novavisio/interfaces';

export const selectCustomersState = createFeatureSelector<fromCustomers.State>(
  fromCustomers.customersFeatureKey
);

export const selectResults: MemoizedSelector<fromCustomers.State, Customer[]> =
    createSelector(selectCustomersState, (state: fromCustomers.State) => state.results);

export const selectFilteredResults: MemoizedSelector<fromCustomers.State, Customer[]> =
    createSelector(selectCustomersState, (state: fromCustomers.State) => state.filteredResults);

export const selectTotalResults: MemoizedSelector<fromCustomers.State, number> =
    createSelector(selectCustomersState, (state: fromCustomers.State) => state.totalResults);

export const selectFilter: MemoizedSelector<fromCustomers.State, CustomerFilter> =
    createSelector(selectCustomersState, (state: fromCustomers.State) => state.filter);

export const selectGetLoading: MemoizedSelector<fromCustomers.State, boolean> =
    createSelector(selectCustomersState, (state: fromCustomers.State) => state.loadings.get);

export const selectCreateLoading: MemoizedSelector<fromCustomers.State, boolean> =
    createSelector(selectCustomersState, (state: fromCustomers.State) => state.loadings.create);
  
export const selectGetError: MemoizedSelector<fromCustomers.State, HttpApiError> =
    createSelector(selectCustomersState, (state: fromCustomers.State) => state.errors.get);
    
export const selectCreateError: MemoizedSelector<fromCustomers.State, HttpApiError> =
    createSelector(selectCustomersState, (state: fromCustomers.State) => state.errors.create);
