import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';

import * as CalendarActions from './calendar.actions';
import {
  CalendarResponse,
  CalendarsResponse,
  CasesResponse,
} from '../../core/models/calendar.models';
import { AuthService } from '../../core/services/auth.service';
import {
  loadCalendar,
  loadCalendarFailure,
  loadCalendarSuccess,
  loadCases,
  loadCasesFailure,
  loadCasesSuccess,
} from './calendar.actions';
import { CaseResponse } from '../../models/case.models';

@Injectable()
export class CalendarEffects {
  actions$ = inject(Actions);
  http = inject(HttpClient);
  authService = inject(AuthService);

  private apiUrl = 'http://localhost:3000/api/calendar'; // Set backend API base URL

  // Load Sender Calendars
  loadSenderCalendars$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CalendarActions.loadSenderCalendars),
      mergeMap(() => {
        //console.log('🔄 Loading sender calendars...');

        const headers = this.authService.getAuthHeaders();
        return this.http
          .get<CalendarsResponse>(`${this.apiUrl}/sended`, { headers })
          .pipe(
            map((response) => {
              //console.log(             '✅ Sender calendars loaded successfully:',               response.data           );
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
        //console.log('🔄 Loading receiver calendars...');

        const headers = this.authService.getAuthHeaders();
        return this.http
          .get<CalendarsResponse>(`${this.apiUrl}/received`, { headers })
          .pipe(
            map((response) => {
              // console.log(
              //   '✅ Receiver calendars loaded successfully:',
              //   response.data
              // );
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

  //
  loadCalendar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCalendar),
      switchMap(({ calendarId }) => {
        //console.log('[CalendarEffects] Fetching calendar for:', calendarId);

        const headers = this.authService.getAuthHeaders();
        const url = `${this.apiUrl}/${calendarId}`;

        return this.http.get<CalendarResponse>(url, { headers }).pipe(
          // tap((response) =>
          //   console.log('[CalendarEffects] API Response:', response)
          // ),
          map((response) =>
            loadCalendarSuccess({
              calendar: response.data, // ✅ Correctly map "data"
            })
          ),
          catchError((error) => {
            console.error('[CalendarEffects] API Error:', error);
            return of(
              loadCalendarFailure({
                error: 'Failed to fetch calendar',
              })
            );
          })
        );
      })
    )
  );

  loadCases$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCases),
      mergeMap(({ calendarId }) => {
        //console.log('Effect triggered: loadCases$', { calendarId });

        const headers = this.authService.getAuthHeaders();
        //console.log('Auth Headers:', headers);

        const url = `${this.apiUrl}/${calendarId}/cases`;
        //console.log('Request URL:', url);

        return this.http.get<CasesResponse>(url, { headers }).pipe(
          map((response) => {
            //console.log('API Response:', response);
            return loadCasesSuccess({ cases: response.data.cases });
          }),
          catchError((error) => {
            console.error('API Error:', error);
            return of(loadCasesFailure({ error: error.message }));
          })
        );
      })
    )
  );
}
