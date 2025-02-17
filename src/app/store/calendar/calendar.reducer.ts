import { createReducer, on } from '@ngrx/store';
import * as CalendarActions from './calendar.actions';
import { Calendar, Case } from '../../core/models/calendar.models';
import {
  loadCases,
  loadCasesFailure,
  loadCasesSuccess,
} from './calendar.actions';

export interface CalendarState {
  senderCalendars: Calendar[];
  receiverCalendars: Calendar[];
  selectedCalendar: Calendar | null;
  casesOfSelectedCalendar: Case[];
  loading: boolean;
  error: string | null;
}

export const initialState: CalendarState = {
  senderCalendars: [],
  receiverCalendars: [],
  selectedCalendar: null,
  casesOfSelectedCalendar: [],
  loading: false,
  error: null,
};

export const calendarReducer = createReducer(
  initialState,
  // Sender Calendars
  on(CalendarActions.loadSenderCalendars, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(CalendarActions.loadSenderCalendarsSuccess, (state, { calendars }) => ({
    ...state,
    senderCalendars: calendars,
    loading: false,
  })),
  on(CalendarActions.loadSenderCalendarsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Receiver Calendars
  on(CalendarActions.loadReceivedCalendars, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(CalendarActions.loadReceivedCalendarsSuccess, (state, { calendars }) => ({
    ...state,
    receiverCalendars: calendars,
    loading: false,
  })),
  on(CalendarActions.loadReceivedCalendarsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // Start loading when fetching calendars
  on(CalendarActions.loadCalendar, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // Successfully fetched calendars
  on(CalendarActions.loadCalendarSuccess, (state, { calendar }) => ({
    ...state,
    selectedCalendar: calendar,
    loading: false,
    error: null,
  })),
  //
  on(loadCases, (state) => ({ ...state, loading: true, error: null })),
  on(loadCasesSuccess, (state, { cases }) => ({
    ...state,
    casesOfSelectedCalendar: cases,
    loading: false,
    error: null,
  })),
  on(loadCasesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Error handling
  on(CalendarActions.loadCalendarFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
