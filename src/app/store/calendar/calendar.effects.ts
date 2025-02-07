import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { catchError, map, mergeMap, of } from 'rxjs';

import * as CalendarActions from './calendar.actions';
import { CalendarsResponse } from '../../core/models/calendar.models';
import { AuthService } from '../../core/services/auth.service';

@Injectable()
export class CalendarEffects {
  actions$ = inject(Actions);
  http = inject(HttpClient);
  authService = inject(AuthService);

  private apiUrl = 'http://localhost:3000/calendar'; // Set backend API base URL

  // Load Sender Calendars
  loadSenderCalendars$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CalendarActions.loadSenderCalendars),
      mergeMap(() => {
        console.log('🔄 Loading sender calendars...');

        const headers = this.authService.getAuthHeaders();
        return this.http
          .get<CalendarsResponse>(`${this.apiUrl}/sended`, { headers })
          .pipe(
            map((response) => {
              console.log(
                '✅ Sender calendars loaded successfully:',
                response.data
              );
              return CalendarActions.loadSenderCalendarsSuccess({
                calendars: response.data,
              });
            }),
            catchError((error) => {
              console.error('❌ Error loading sender calendars:', error);
              return of(
                CalendarActions.loadSenderCalendarsFailure({
                  error: error.message,
                })
              );
            })
          );
      })
    )
  );

  // Load Receiver Calendars
  loadReceivedCalendars$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CalendarActions.loadReceivedCalendars),
      mergeMap(() => {
        console.log('🔄 Loading receiver calendars...');

        const headers = this.authService.getAuthHeaders();
        return this.http
          .get<CalendarsResponse>(`${this.apiUrl}/received`, { headers })
          .pipe(
            map((response) => {
              console.log(
                '✅ Receiver calendars loaded successfully:',
                response.data
              );
              return CalendarActions.loadReceivedCalendarsSuccess({
                calendars: response.data,
              });
            }),
            catchError((error) => {
              console.error('❌ Error loading receiver calendars:', error);
              return of(
                CalendarActions.loadReceivedCalendarsFailure({
                  error: error.message,
                })
              );
            })
          );
      })
    )
  );
}
