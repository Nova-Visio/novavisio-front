import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService as AuthApiService } from '@novavisio/api-gateway';
import { AuthService } from '../auth.service';
import { LoginResponse } from '@novavisio/interfaces';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authApiService: AuthApiService,
    private authService: AuthService
  ) {}

  loginEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap((action) =>
        this.authApiService.login$(action.username, action.password).pipe(
          map(({ data: { jwt: token, user: userSession } }: { data: LoginResponse }) => {
            return AuthActions.loginSuccess({ token, userSession });
          }),
          catchError((error) => of(AuthActions.loginFailure({ error })))
        )
      )
    );
  });
}
