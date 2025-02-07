import {
  inject,
  Injectable,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import {
  AuthResponse,
  ProfileResponse,
  UsernameResponse,
} from '../../models/auth.models';
import { LoginResponse, User } from '../models/auth.models';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  selectIsLogged,
  selectToken,
  selectUser,
} from '../../store/auth/auth.selectors';
import {
  loginSuccessful,
  loginFail,
  logout,
} from '../../store/auth/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth'; // Replace with your API base URL

  // ✅ Injected dependencies
  private router = inject(Router);
  private http = inject(HttpClient);
  private store = inject(Store);

  // ✅ Convert NgRx state to a signal
  isLogged: Signal<boolean> = toSignal(this.store.select(selectIsLogged), {
    initialValue: false,
  });
  user: Signal<User> = toSignal(
    this.store.select(selectUser),
    { initialValue: { id: '', email: '', username: '' } } // Ensure a default user
  ) as Signal<User>;

  token: Signal<string> = toSignal(this.store.select(selectToken), {
    initialValue: '',
  }) as Signal<string>;

  // ✅ Login (returns an Observable and updates store)
  login(email: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        map((response) => {
          this.store.dispatch(
            loginSuccessful({
              message: response.message,
              token: response.token,
              user: response.user,
            })
          );
          return response;
        }),
        catchError((error) => {
          const errorMessage =
            error?.error?.message || error?.message || 'Login failed';

          console.error('Login error:', errorMessage); // Log in console

          this.store.dispatch(loginFail({ error: errorMessage }));

          return throwError(() => new Error(errorMessage)); // Throw error for component to catch
        })
      );
  }

  // ✅ Logout (dispatch action and clear state)
  logout(): void {
    this.store.dispatch(logout());
  }

  // ✅ Register (returns an Observable)
  register(
    email: string,
    username: string,
    password: string
  ): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, {
      email,
      username,
      password,
    });
  }

  // ✅ Fetch Profile (returns an Observable)
  getUser(): Observable<ProfileResponse> {
    const token = this.getToken();
    if (!token) {
      return of({
        user: {
          email: '',
          exp: 0,
          iat: 0,
          id: '',
          username: 'Guest',
        }, // ✅ Provide a valid User object
        message: 'No token found. User is not authenticated.',
      });
    }

    return this.http
      .get<ProfileResponse>(`${this.apiUrl}/user`, {
        headers: this.getAuthHeaders(),
      })
      .pipe(
        catchError((error) => {
          console.error('Failed to fetch profile:', error);
          return of({
            user: {
              email: '',
              exp: 0,
              iat: 0,
              id: '',
              username: 'Guest',
            }, // ✅ Ensure `user` is never `null`
            message: 'Failed to fetch profile. Please try again.',
          });
        })
      );
  }

  checkIfLoggedIn(): void {
    const token = this.getToken();
    if (!token) {
      console.warn('[AuthService] No token found.');
      return;
    }

    this.getUser().subscribe({
      next: (profileResponse) => {
        console.log('[AuthService] User is logged in:', profileResponse.user);
        this.store.dispatch(
          loginSuccessful({
            message: 'User restored from token',
            token,
            user: profileResponse.user,
          })
        );
      },
      error: (error) => {
        console.error('[AuthService] Token is invalid, removing it.', error);
        this.clearToken();
        this.store.dispatch(
          loginFail({ error: 'Session expired. Please log in again.' })
        );
      },
    });
  }
  // ✅ Get Username (returns an Observable)
  getUserName(id: string): Observable<string | null> {
    return this.http
      .get<UsernameResponse>(`${this.apiUrl}/user/${id}/username`, {
        headers: this.getAuthHeaders(),
      })
      .pipe(
        map((response) => response.username),
        catchError((error) => {
          console.warn('Failed to fetch username:', error);
          return of(null);
        })
      );
  }

  // ✅ Helper: Check if token exists
  private hasToken(): boolean {
    return !!this.getToken();
  }

  // ✅ Helper: Get the token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // ✅ Helper: Store the token
  private setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // ✅ Helper: Clear the token
  private clearToken(): void {
    localStorage.removeItem('token');
  }

  // ✅ Helper: Create authorization headers
  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }
}
