import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CalendarState } from './calendar.reducer';
import { state } from '@angular/animations';

// Feature selector for the 'calendar' state
export const selectCalendarState =
  createFeatureSelector<CalendarState>('calendar');

// Select sender calendars
export const selectSenderCalendars = createSelector(
  selectCalendarState,
  (state) => state.senderCalendars
);

// Select receiver calendars
export const selectReceiverCalendars = createSelector(
  selectCalendarState,
  (state) => state.receiverCalendars
);

// Select loading state
export const selectCalendarsLoading = createSelector(
  selectCalendarState,
  (state) => state.loading
);

// Select error state
export const selectCalendarsError = createSelector(
  selectCalendarState,
  (state) => state.error
);

export const selectSelectedCalendar = createSelector(
  selectCalendarState,
  (state) => state.selectedCalendar
);

export const selectCasesOfSelectedCalendar = createSelector(
  selectCalendarState,
  (state) => state.casesOfSelectedCalendar
);
