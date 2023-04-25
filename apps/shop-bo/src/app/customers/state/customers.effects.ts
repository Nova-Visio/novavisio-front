import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { CustomersService } from '@novavisio/api-gateway';
import { Customer, CustomerFilter, PagedList } from '@novavisio/interfaces';
import { Store } from '@ngrx/store';
import * as CustomersActions from './customers.actions';
import * as fromCustomers from './customers.reducer';
import * as CustomersSelect from './customers.selectors';

@Injectable()
export class CustomersEffects {
    constructor(
        private actions$: Actions,
        private customersService: CustomersService,
        private store: Store<fromCustomers.State>
    ) {}

    customersEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(CustomersActions.getCustomers),
            switchMap(() => this.store.select(CustomersSelect.selectFilter)),
            switchMap((filter: CustomerFilter) => this.customersService.getAll$(filter)
                .pipe(
                    map((response: PagedList<Customer>) => CustomersActions.getCustomersSuccess(response)),
                    catchError((error) => of(CustomersActions.getCustomersFailure({ error })))
                )
            )
        );
    });

    setCustomersFilterEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(CustomersActions.setCustomersFilter),
            map(() => CustomersActions.getCustomers())
        );
    });
}
