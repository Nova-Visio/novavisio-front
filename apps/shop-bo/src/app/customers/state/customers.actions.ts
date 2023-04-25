import { createAction, props } from '@ngrx/store';
import { Customer, CustomerFilter, HttpApiError, PagedList } from '@novavisio/interfaces';

const key = '[Customers]';

export const getCustomers = createAction(
  `${key} get customers`
);

export const getCustomersSuccess = createAction(
  `${key} get customers success`,
  props<PagedList<Customer>>()
);

export const getCustomersFailure = createAction(
  `${key} get customers failure`,
  props<{ error: HttpApiError }>()
);

export const setCustomersFilter = createAction(
  `${key} set customers filter`,
  props<CustomerFilter>()
);
