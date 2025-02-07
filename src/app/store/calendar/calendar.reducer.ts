import { createReducer, on } from '@ngrx/store';
import * as CalendarActions from './calendar.actions';
import { Calendar } from '../../core/models/calendar.models';

export interface CalendarState {
  senderCalendars: Calendar[];
  receiverCalendars: Calendar[];
  loading: boolean;
  error: string | null;
}

export const initialState: CalendarState = {
  senderCalendars: [],
  receiverCalendars: [],
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
  }))
);
