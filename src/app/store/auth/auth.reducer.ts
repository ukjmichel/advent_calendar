import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
  user: { id: string; email: string; username: string } | null;
  token: string | null;
  message: string | null;
  loading: boolean;
  error: string | null;
  isLogged: boolean; // ✅ Add isLogged state
}

export const initialState: AuthState = {
  user: null,
  token: null,
  message: null,
  loading: false,
  error: null,
  isLogged: false, // ✅ Initialize as false
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AuthActions.loginSuccessful, (state, { message, token, user }) => ({
    ...state,
    user,
    token,
    message: message ?? 'Login successful',
    loading: false,
    error: null,
    isLogged: true, // ✅ Set isLogged to true on successful login
  })),
  on(AuthActions.loginFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    isLogged: false, // ✅ Ensure user is not logged in on failure
  })),
  // ✅ Handle Logout
  on(AuthActions.logout, (state) => ({
    ...initialState, // Reset state on logout
    isLogged: false, // Ensure isLogged is set to false
  }))
);
