import {
  Component,
  HostListener,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { LayoutComponent } from '../../core/layout/layout.component';
import { RouterLink } from '@angular/router';
import { CalendarListService } from '../../services/calendar-list.service';
import { ScreenSizeService } from '../../services/screen-size.service';

import { AuthenticationService } from '../../services/authentication.service';
import { Calendar } from '../../models/calendar.models';
import { CalendarsItemComponent } from './calendars-item/calendars-item.component';


@Component({
    selector: 'app-calendars-page',
    imports: [LayoutComponent, RouterLink, CalendarsItemComponent],
    templateUrl: './calendars-page.component.html',
    styleUrls: ['./calendars-page.component.css']
})
export class CalendarsPageComponent implements OnInit {
  headerIcon = 'assets/icons/chrismas_ball_gold.svg';
  headerTitle = 'Mes Calendrier';
  calendarsService = inject(CalendarListService);
  screenWidth = inject(ScreenSizeService).screenWidth;
  authService = inject(AuthenticationService);
  ownCalendars: Calendar[] = [];
  giftedCalendars: Calendar[] = [];
  displayedOwnCalendars = signal<Calendar[]>([]);
  displayedGiftedCalendars = signal<Calendar[]>([]);
  ownCalendarsPage = 0;
  giftedCalendarsPage = 0;
  itemsPerPage = 1;

  async ngOnInit(): Promise<void> {
    try {
      // Fetch calendars
      this.ownCalendars = await this.calendarsService.getReceiverCalendars();
      this.giftedCalendars = await this.calendarsService.getSenderCalendars();

      // Initialize displayed data
      this.updateDisplay('ownCalendars');
      this.updateDisplay('giftedCalendars');
    } catch (error) {
      console.error('Error fetching calendars:', error);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    // Update displayed items on window resize
    this.updateDisplay('ownCalendars');
    this.updateDisplay('giftedCalendars');
  }

  updateDisplay(type: 'ownCalendars' | 'giftedCalendars'): void {
    // Determine items per page based on screen width
    if (this.screenWidth() < 960) {
      this.itemsPerPage = 1;
    } else if (this.screenWidth() < 1280) {
      this.itemsPerPage = 2;
    } else {
      this.itemsPerPage = 3;
    }

    const page =
      type === 'ownCalendars'
        ? this.ownCalendarsPage
        : this.giftedCalendarsPage;
    const start = page * this.itemsPerPage;
    const end = start + this.itemsPerPage;

    const targetCalendars =
      type === 'ownCalendars' ? this.ownCalendars : this.giftedCalendars;

    const targetSignal =
      type === 'ownCalendars'
        ? this.displayedOwnCalendars
        : this.displayedGiftedCalendars;

    targetSignal.set(targetCalendars.slice(start, end));
  }

  nextPage(type: 'ownCalendars' | 'giftedCalendars'): void {
    if (type === 'ownCalendars') {
      if (
        (this.ownCalendarsPage + 1) * this.itemsPerPage <
        this.ownCalendars.length
      ) {
        this.ownCalendarsPage++;
        this.updateDisplay('ownCalendars');
      }
    } else if (type === 'giftedCalendars') {
      if (
        (this.giftedCalendarsPage + 1) * this.itemsPerPage <
        this.giftedCalendars.length
      ) {
        this.giftedCalendarsPage++;
        this.updateDisplay('giftedCalendars');
      }
    }
  }

  prevPage(type: 'ownCalendars' | 'giftedCalendars'): void {
    if (type === 'ownCalendars') {
      if (this.ownCalendarsPage > 0) {
        this.ownCalendarsPage--;
        this.updateDisplay('ownCalendars');
      }
    } else if (type === 'giftedCalendars') {
      if (this.giftedCalendarsPage > 0) {
        this.giftedCalendarsPage--;
        this.updateDisplay('giftedCalendars');
      }
    }
  }
}
