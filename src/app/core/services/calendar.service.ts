import { Injectable, Signal, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as CalendarActions from '../../store/calendar/calendar.actions';
import { Calendar, Case } from '../models/calendar.models';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  selectCasesOfSelectedCalendar,
  selectReceiverCalendars,
  selectSelectedCalendar,
  selectSenderCalendars,
} from '../../store/calendar/calendar.selector';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  private store = inject(Store);

  // Reactive signals for NgRx state
  receivedCalendars: Signal<Calendar[]> = toSignal(
    this.store.select(selectReceiverCalendars),
    { initialValue: [] }
  );
  sendedCalendars: Signal<Calendar[]> = toSignal(
    this.store.select(selectSenderCalendars),
    { initialValue: [] }
  );

  selectedCalendar: Signal<Calendar | null | undefined> = toSignal(
    this.store.select(selectSelectedCalendar)
  );

  casesOfSelectedCalendar: Signal<Case[]> = toSignal(
    this.store.select(selectCasesOfSelectedCalendar),
    { initialValue: [] }
  );

  /**
   * Dispatch action to load sender calendars.
   */
  loadSenderCalendars(): void {
    this.store.dispatch(CalendarActions.loadSenderCalendars());
  }

  /**
   * Dispatch action to load receiver calendars.
   */
  loadReceivedCalendars(): void {
    this.store.dispatch(CalendarActions.loadReceivedCalendars());
  }

  loadCalendar(calendarId: string): void {
    this.store.dispatch(CalendarActions.loadCalendar({ calendarId }));
  }

  loadCases(calendarId: string): void {
    this.store.dispatch(CalendarActions.loadCases({ calendarId }));
  }
}
