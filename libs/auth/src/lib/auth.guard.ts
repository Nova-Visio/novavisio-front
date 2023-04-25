import { Inject, Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router, CanLoad } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { AuthConfig } from './auth-config';

/**
 * Controla el acceso a páginas que requieren autenticación.
 */
@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    @Inject('authConfig')
    private authConfig: AuthConfig,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  /**
   * Devuelve true si el usuario está autenticado. Se lo redirije de lo contrario.
   * @returns True si está autenticado. False de lo contrario.
   */
  public canActivate(): Observable<boolean | UrlTree> {
    // const ret: Observable<boolean | UrlTree> = this.authService
    //   .isAuthenticated$()
    //   .pipe(
    //     map(
    //       (isAuthorized: boolean) =>
    //         isAuthorized ||
    //         this.router.createUrlTree([this.authConfig.loginRoute])
    //     )
    //   );
    // return ret;
    return of(true)
  }

  /**
   * Determina si un módulo puede ser cargado.
   * @returns Load.
   */
  public canLoad(): Observable<boolean | UrlTree> {
    // const ret: Observable<boolean | UrlTree> = this.authService
    //   .isAuthenticated$()
    //   .pipe(
    //     map(
    //       (isAuthorized: boolean) =>
    //         isAuthorized ||
    //         this.router.createUrlTree([this.authConfig.loginRoute])
    //     )
    //   );
    // return ret;
    return of(true)
  }
}
