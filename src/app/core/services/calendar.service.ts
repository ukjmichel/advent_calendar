import { Injectable, Signal, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as CalendarActions from '../../store/calendar/calendar.actions';
import { Calendar } from '../models/calendar.models';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  selectReceiverCalendars,
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
}
