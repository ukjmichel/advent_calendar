import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { catchError, exhaustMap, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {
  getUser,
  getUserFailure,
  getUserSuccess,
  login,
  loginFail,
  loginSuccessful,
  logout,
  register,
  registerFailure,
  registerSuccess,
} from './auth.actions';

import { LoginResponse } from '../../core/models/auth.models';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthEffects {
  // Dependency Injection
  private actions$ = inject(Actions);
  private router = inject(Router);
  private http = inject(HttpClient);

  private apiUrl = environment.apiUrl;

  /**
   * Handles user login action, making an HTTP request to authenticate
   * and dispatching either a success or failure action accordingly.
   */
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      tap(({ email }) =>
        console.log('[AuthEffects] Login action received:', email)
      ),
      // Use `exhaustMap` to prevent multiple login requests
      exhaustMap(({ email, password }) =>
        this.http
          .post<LoginResponse>(`${this.apiUrl}auth/login`, { email, password })
          .pipe(
            tap((response) =>
              console.log('[AuthEffects] API Response:', response)
            ),
            map((response) =>
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

  /**
   * Handles user registration action, making an HTTP request to register
   * and dispatching either a success or failure action accordingly.
   */
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(register),
      tap(({ email }) =>
        console.log('[AuthEffects] Register action received:', email)
      ),
      // Use `exhaustMap` to prevent multiple requests on repeated clicks
      exhaustMap(({ email, username, password }) =>
        this.http
          .post<LoginResponse>(`${this.apiUrl}auth/register`, {
            email,
            username,
            password,
          })
          .pipe(
            tap((response) =>
              console.log('[AuthEffects] API Response:', response)
            ),
            map((response) =>
              registerSuccess({
                message: response.message,
                token: response.token,
                user: response.user,
              })
            ),
            catchError((error) => {
              console.error('[AuthEffects] Register failed:', error);
              return of(
                registerFailure({
                  error:
                    error?.error?.message ||
                    error?.message ||
                    'Registration failed',
                })
              );
            })
          )
      )
    )
  );

  /**
   *  Load User
   */

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUser), // Listen for getUser action
      switchMap(() => {
        const token = localStorage.getItem('token');

        if (!token) {
          console.warn('[AuthEffects] No token found.');
          return of(
            getUserFailure({
              error: 'No authentication token found',
            })
          );
        }

        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });

        return this.http
          .get<LoginResponse>(`${this.apiUrl}auth/user`, { headers })
          .pipe(
            tap((response) =>
              console.log('[AuthEffects] API Response:', response)
            ),
            map((response) =>
              getUserSuccess({
                message: response.message,
                user: response.user,
                token: response.token,
              })
            ),
            catchError((error) => {
              console.error('[AuthEffects] API Error:', error);
              return of(
                getUserFailure({
                  error: 'Failed to fetch user data',
                })
              );
            })
          );
      })
    )
  );

  /**
   * Stores authentication token in localStorage upon successful login or registration.
   */
  setToken$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccessful, registerSuccess),
        tap(({ token }) => {
          console.log('[AuthEffects] Saving token:', token);
          localStorage.setItem('token', token);
        })
      ),
    { dispatch: false }
  );

  /**
   * Clears authentication token from localStorage upon logout.
   */
  clearToken$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logout),
        tap(() => {
          console.log(
            '[AuthEffects] Logging out: Removing token from localStorage'
          );
          localStorage.removeItem('token');
        })
      ),
    { dispatch: false }
  );

  /**
   * Redirects users to the calendar page after successful authentication.
   */
  redirectAfterAuth$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccessful, registerSuccess),
        tap(() => this.router.navigate(['/calendars']))
      ),
    { dispatch: false }
  );

  /**
   * Redirects users to the authentication page after logout.
   */
  redirectAfterLogout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logout),
        tap(() => this.router.navigate(['/auth']))
      ),
    { dispatch: false }
  );
}
