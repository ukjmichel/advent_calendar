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
  // 🔵 Start logging
  on(AuthActions.login, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  /**
   * 
   */
  // ✅ Successfully loggin
  on(AuthActions.loginSuccessful, (state, { message, token, user }) => ({
    ...state,
    user,
    token,
    message: message ?? 'Login successful',
    loading: false,
    error: null,
    isLogged: true,
  })),
  // ❌ Failed to loggin
  on(AuthActions.loginFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    isLogged: false,
  })),
  /**
   * 
   */
  // 🔵 Start loading when fetching user
  on(AuthActions.getUser, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // ✅ Successfully fetched user
  on(AuthActions.getUserSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
    isLogged: true,
    error: null,
  })),
  // ❌ Failed to fetch user
  on(AuthActions.getUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  /**
   * 
   */
  // ✅ Handle Logout
  on(AuthActions.logout, (state) => ({
    ...initialState, // Reset state on logout
    isLogged: false, // Ensure isLogged is set to false
  })),
  on(AuthActions.clearError, (state) => ({
    ...state,
    error: null, // Clear error when clearError is dispatched
  })),
  //✅ Handle Register
  on(AuthActions.register, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AuthActions.registerSuccess, (state, { message, user, token }) => ({
    ...state,
    user,
    token,
    message,
    loading: false,
    error: null,
    isLogged: true, // ✅ Set isLogged to true on successful registration
  })),
  on(AuthActions.registerFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    isLogged: false, // ✅ Ensure isLogged remains false on failure
  }))
);
