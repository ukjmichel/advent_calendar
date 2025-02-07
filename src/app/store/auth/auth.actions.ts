import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Auth] Login',
  props<{ email: string; password: string }>() // Change username -> email
);

export const loginSuccessful = createAction(
  '[Auth] Login Successful',
  props<{
    message: string;
    token: string;
    user: { id: string; email: string; username: string };
  }>()
);

export const loginFail = createAction(
  '[Auth] Login Fail',
  props<{ error: string }>()
);

export const logout = createAction('[Auth] Logout');