import { createAction, props } from '@ngrx/store';
import { Calendar, CasesData } from '../../core/models/calendar.models';

// Load sender Calendars
export const loadSenderCalendars = createAction('[Calendar] Load Sender Calendars');
export const loadSenderCalendarsSuccess = createAction(
  '[Calendar] Load Sender Calendars Success',
  props<{ calendars: Calendar[] }>()
);
export const loadSenderCalendarsFailure = createAction(
  '[Calendar] Load Sender Calendars Failure',
  props<{ error: string }>()
);

// Load receiver calendars
export const loadReceivedCalendars = createAction(
  '[Calendar] Load Receiver Calendars'
);
export const loadReceivedCalendarsSuccess = createAction(
  '[Calendar] Load Receiver Calendars Success',
  props<{ calendars: Calendar[] }>()
);
export const loadReceivedCalendarsFailure = createAction(
  '[Calendar] Load Receiver Calendars Failure',
  props<{ error: string }>()
);

// Load a single calendar
export const loadCalendar = createAction(
  '[Calendar] Load Calendar',
  props<{ calendarId: string }>()
);
export const loadCalendarSuccess = createAction(
  '[Calendar] Load Calendar Success',
  props<{ calendar: Calendar }>()
);
export const loadCalendarFailure = createAction(
  '[Calendar] Load Calendar Failure',
  props<{ error: string }>()
);

// Load cases
export const loadCases = createAction(
  '[Calendar] Load Cases',
  props<{ calendarId: string }>()
);
export const loadCasesSuccess = createAction(
  '[Calendar] Load Cases Success',
  props<{ cases: CasesData }>()
);
export const loadCasesFailure = createAction(
  '[Calendar] Load Cases Failure',
  props<{ error: string }>()
);

// Create new calendar
export const createCalendar = createAction(
  '[Calendar] Create Calendar',
  props<{
    senderId: string;
    receiver: string;
    message: string;
    image_path: string;
  }>()
);
export const createCalendarSuccess = createAction(
  '[Calendar] Create Calendar Success',
  props<{ calendar: Calendar }>()
);
export const createCalendarFailure = createAction(
  '[Calendar] Create Calendar Failure',
  props<{ error: string }>()
);
