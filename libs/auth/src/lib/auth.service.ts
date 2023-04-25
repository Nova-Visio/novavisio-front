import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserSession } from '@novavisio/interfaces';
import { selectToken } from './state/auth.selectors';
import * as fromAuth from './state/auth.reducer';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {
  private jwtHelperService: JwtHelperService;

  constructor(private store: Store<fromAuth.State>) {
    this.jwtHelperService = new JwtHelperService();
  }

  public isAuthenticated$(): Observable<boolean> {
    return this.store.select(selectToken).pipe(
      map((token: string) => {
        const hasSession = !!token && !this.isExpiredToken(token);
        return hasSession;
      }),
      // Si lanza error, rechaza la autorización.
      catchError(() => of(false))
    );
  }

  public getUserSession(token: string): UserSession {
    const userSession: UserSession =
      this.jwtHelperService.decodeToken<UserSession>(token);
    return userSession;
  }

  private isExpiredToken(token: string): boolean {
    const isExpired: boolean = this.jwtHelperService.isTokenExpired(token, 0);
    return isExpired;
  }
}
