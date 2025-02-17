import { createAction, props } from '@ngrx/store';
import { AuthResponse, User } from '../../models/auth.models';
import { LoginResponse } from '../../core/models/auth.models';

// Login Actions
export const login = createAction(
  '[Auth] Login',
  props<{ email: string; password: string }>()
);

export const loginSuccessful = createAction(
  '[Auth] Login Successful',
  props<LoginResponse>()
);

export const loginFail = createAction(
  '[Auth] Login Fail',
  props<{ error: string }>()
);

// Register Actions
export const register = createAction(
  '[Auth] Register',
  props<{ email: string; username: string; password: string }>()
);

export const registerSuccess = createAction(
  '[Auth] Register Success',
  props<LoginResponse>() // ✅ Ensure message is included
);

export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ error: string }>()
);
// Get User Action
export const getUser = createAction('[Auth] Get User');

export const getUserSuccess = createAction(
  '[Auth] Get User Success',
  props<LoginResponse>()
);

export const getUserFailure = createAction(
  '[Auth] Get User Failure',
  props<{ error: string }>()
);

// Logout action
export const logout = createAction('[Auth] Logout');

// Clear Error
export const clearError = createAction('[Auth] Clear Error');
