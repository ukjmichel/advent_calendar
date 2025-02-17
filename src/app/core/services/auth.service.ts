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
  login,
  clearError,
  register,
  getUser,
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
  login(email: string, password: string) {
    this.store.dispatch(login({ email, password }));
  }

  // ✅ Logout (dispatch action and clear state)
  logout(): void {
    this.store.dispatch(logout());
  }

  // ✅ Register (returns an Observable)
  register(email: string, username: string, password: string) {
    this.store.dispatch(register({ email, username, password }));
  }

  checkIfLoggedIn(): void {
    this.store.dispatch(getUser()); // Dispatch action instead of making API call
  }

  clearError() {
    this.store.dispatch(clearError());
  }

  // ✅ Helper: Create authorization headers
  getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem("token")
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }
}
