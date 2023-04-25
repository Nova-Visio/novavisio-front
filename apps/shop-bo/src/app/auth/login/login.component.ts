import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthActions, fromAuth, selectLoading } from '@novavisio/auth';
import { MessengerService } from '@novavisio/components';
import { ApiErrorCodes, Credentials, HttpApiError } from '@novavisio/interfaces';
import { EMPTY, Observable, Subject, throwError } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';

@Component({
  selector: 'nv-shop-bo-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {

  /** True si la vista está cargando datos o ejecutando una operación. False de lo contrario. */
  public loading$: Observable<boolean>;

  /** Referencia para desuscribir observables del componente. */
  private destroy$: Subject<boolean> = new Subject<boolean>();

  /**
   * Creates an instance of login component.
   * @param translateService Administra operaciones de i18n.
   * @param messageModalService Servicio que muestra mensajes en un modal.
   * @param router Administra operaciones de ruteo.
   * @param store Administra operaciones para manejar el estado de la app.
   */
  constructor(
      public readonly translateService: TranslateService,
      private readonly messageModalService: MessengerService,
      private readonly router: Router,
      private readonly store: Store<fromAuth.State>,
      private readonly actions$: Actions,
      private readonly messengerService: MessengerService
  ) { }

  public ngOnInit(): void {
    this.loading$ = this.store.select(selectLoading)
    this.listenLoginSuccess();
    this.listenLoginFailure();
  }

  /**
   * Evento de destrucción del componente.
   */
  public ngOnDestroy(): void {
      this.destroy$.next(true);
      this.destroy$.complete();
  }

  /**
   * Despacha acción de autenticación.
   * @param credentials User credentials model.
   */
  public login(credentials: Credentials): void {
    this.store.dispatch(AuthActions.login(credentials));
  }

  /**
   * Escucha autenticación exitosa y redirije a la página principal.
   */
  private listenLoginSuccess(): void {
    this.actions$
      .pipe(ofType(AuthActions.loginSuccess), takeUntil(this.destroy$))
      .subscribe(() => {
        // Redirije a la ruta por defecto.
        this.router.navigateByUrl('');
      });
  }

  /**
   * Escucha error de autenticación y muestra mensaje
   */
  private listenLoginFailure(): void {
    this.actions$
      .pipe(
        ofType(AuthActions.loginFailure),
        map((action) => action.error),
        takeUntil(this.destroy$))
      .subscribe((error: HttpApiError) => {
        this.handleLoginError(error)
      });
  }

  /**
   * Maneja errores de login.
   * @param apiError Error durante el login.
   * @returns Observable.
   */

  private handleLoginError(apiError: HttpApiError): Observable<never> {
      let ret: Observable<never> = EMPTY;

      switch (apiError?.error?.errorCode) {

          case ApiErrorCodes.ErrAuthInvalidCredentials:
              this.messageModalService.showError({
                  text: this.translateService.instant('AUTH.LOGIN.ERROR.CREDENTIALS')
              });
              break;

          default:
              ret = throwError(() => ({
                  ...apiError,
                  handle: true,
              }));
      }

      return ret;
  }
}
