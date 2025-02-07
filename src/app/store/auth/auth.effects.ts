import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { login, loginFail, loginSuccessful, logout } from './auth.actions';
import { AuthService } from '../../core/services/auth.service';
import { LoginResponse } from '../../core/models/auth.models';
import { of } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthEffects {
  actions$ = inject(Actions);
  router = inject(Router);
  http = inject(HttpClient);
  authService = inject(AuthService);

  private apiUrl = environment.apiUrl;

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login), // When the login action is dispatched
      tap(({ email }) =>
        console.log('[AuthEffects] Login action received:', email)
      ), // Debugging action

      switchMap(({ email, password }) =>
        this.http
          .post<LoginResponse>(`${this.apiUrl}auth/login`, { email, password })
          .pipe(
            tap((response) =>
              console.log('[AuthEffects] API Response:', response)
            ), // Debugging success response

            map((response: LoginResponse) =>
              loginSuccessful({
                message: response.message,
                token: response.token,
                user: response.user,
              })
            ),

            catchError((error) => {
              console.error('[AuthEffects] Login failed:', error);
              return of(
                loginFail({
                  error:
                    error?.error?.message || error?.message || 'Login failed',
                })
              );
            })
          )
      )
    )
  );

  setToken$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loginSuccessful),
        tap((action) => {
          console.log('Saving token:', action.token); // Debugging log
          localStorage.setItem('token', action.token); // Store token
        })
      );
    },
    { dispatch: false } // Prevents unnecessary dispatching
  );

  clearToken$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(logout),
        tap(() => {
          console.log('Logging out: Removing token from localStorage'); // Debugging log
          localStorage.removeItem('token'); // Remove token
        })
      );
    },
    { dispatch: false } // Prevents unnecessary dispatching
  );

  redirectAfterLogin$ = createEffect(
    () => {
      return this.actions$?.pipe(
        ofType(loginSuccessful),
        tap((action) => this.router.navigate(['/calendars']))
      );
    },
    { dispatch: false }
  );

  redirectAfterLogout$ = createEffect(
    () => {
      return this.actions$?.pipe(
        ofType(logout),
        tap((action) => this.router.navigate(['/auth']))
      );
    },
    { dispatch: false }
  );
}
