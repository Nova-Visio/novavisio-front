import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { SharedStateModel } from './shared.state-model';

@Injectable()
export class SharedEffects {
    constructor(
        private actions$: Actions,
        private store: Store<SharedStateModel>
    ) {}
}
