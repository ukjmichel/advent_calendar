import {
  Component,
  HostListener,
  inject,
  OnDestroy,
  OnInit,
  signal,
  effect,
} from '@angular/core';
import { LayoutComponent } from '../../core/layout/layout.component';
import { RouterLink } from '@angular/router';
import { ScreenSizeService } from '../../core/services/screen-size.service';
import { Calendar } from '../../core/models/calendar.models';
import { CalendarsItemComponent } from './calendars-item/calendars-item.component';
import { CalendarService } from '../../core/services/calendar.service';

@Component({
  selector: 'app-calendars-page',
  standalone: true,
  imports: [LayoutComponent, RouterLink, CalendarsItemComponent],
  templateUrl: './calendars-page.component.html',
  styleUrls: ['./calendars-page.component.css'],
})
export class CalendarsPageComponent implements OnInit {
  headerIcon = 'assets/icons/chrismas_ball_gold.svg';
  headerTitle = 'Mes Calendriers';

  private screenWidth = inject(ScreenSizeService).screenWidth;
  private calendarService = inject(CalendarService);

  // Use signals for automatic reactivity
  ownCalendars = this.calendarService.receivedCalendars;
  giftedCalendars = this.calendarService.sendedCalendars;

  displayedOwnCalendars = signal<Calendar[]>([]);
  displayedGiftedCalendars = signal<Calendar[]>([]);
  ownCalendarsPage = 0;
  giftedCalendarsPage = 0;
  itemsPerPage = 1;

  // ✅ Define effects as class properties (injection context is available)
  private ownCalendarsEffect = effect(() => {
    this.updateDisplay('ownCalendars');
  });

  private giftedCalendarsEffect = effect(() => {
    this.updateDisplay('giftedCalendars');
  });

  ngOnInit(): void {
    // Dispatch actions to load calendars
    this.calendarService.loadReceivedCalendars();
    this.calendarService.loadSenderCalendars();
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.updateDisplay('ownCalendars');
    this.updateDisplay('giftedCalendars');
  }

  updateDisplay(type: 'ownCalendars' | 'giftedCalendars'): void {
    this.itemsPerPage =
      this.screenWidth() < 960 ? 1 : this.screenWidth() < 1280 ? 2 : 3;

    const page =
      type === 'ownCalendars'
        ? this.ownCalendarsPage
        : this.giftedCalendarsPage;
    const start = page * this.itemsPerPage;
    const end = start + this.itemsPerPage;

    const targetCalendars =
      type === 'ownCalendars' ? this.ownCalendars() : this.giftedCalendars();
    const targetSignal =
      type === 'ownCalendars'
        ? this.displayedOwnCalendars
        : this.displayedGiftedCalendars;

    targetSignal.set(targetCalendars.slice(start, end));
  }

  nextPage(type: 'ownCalendars' | 'giftedCalendars'): void {
    if (
      type === 'ownCalendars' &&
      (this.ownCalendarsPage + 1) * this.itemsPerPage <
        (this.ownCalendars()?.length || 0)
    ) {
      this.ownCalendarsPage++;
      this.updateDisplay('ownCalendars');
    } else if (
      type === 'giftedCalendars' &&
      (this.giftedCalendarsPage + 1) * this.itemsPerPage <
        (this.giftedCalendars()?.length || 0)
    ) {
      this.giftedCalendarsPage++;
      this.updateDisplay('giftedCalendars');
    }
  }

  prevPage(type: 'ownCalendars' | 'giftedCalendars'): void {
    if (type === 'ownCalendars' && this.ownCalendarsPage > 0) {
      this.ownCalendarsPage--;
      this.updateDisplay('ownCalendars');
    } else if (type === 'giftedCalendars' && this.giftedCalendarsPage > 0) {
      this.giftedCalendarsPage--;
      this.updateDisplay('giftedCalendars');
    }
  }
}
