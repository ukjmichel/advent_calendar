import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { authReducer } from './store/auth/auth.reducer';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './store/auth/auth.effects';
import { AuthService } from './core/services/auth.service';
import { calendarReducer } from './store/calendar/calendar.reducer';
import { CalendarEffects } from './store/calendar/calendar.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()), // Router configuration
    provideHttpClient(), // Globally provide HttpClient
    provideStore({ auth: authReducer, calendar: calendarReducer }),
    provideEffects([AuthEffects, CalendarEffects]),
    AuthService,
  ],
};
