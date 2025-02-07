import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { loginSuccessful, logout } from './auth.actions';
import { Store } from '@ngrx/store';
import { AuthService } from '../../core/services/auth.service';

@Injectable()
export class AuthEffects {
  actions$ = inject(Actions);
  router = inject(Router);
  authService = inject(AuthService);

  

  

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
