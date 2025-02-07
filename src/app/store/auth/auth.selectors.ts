import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectUser = createSelector(
  selectAuthState,
  (state) => state.user
);
export const selectToken = createSelector(
  selectAuthState,
  (state) => state.token
);
export const selectMessage = createSelector(
  selectAuthState,
  (state) => state.message
);
export const selectLoading = createSelector(
  selectAuthState,
  (state) => state.loading
);
export const selectError = createSelector(
  selectAuthState,
  (state) => state.error
);
export const selectIsLogged = createSelector(
  selectAuthState,
  (state) => state.isLogged
); // ✅ New selector
