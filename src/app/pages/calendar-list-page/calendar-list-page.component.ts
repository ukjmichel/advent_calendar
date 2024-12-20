import { Component, HostListener, inject, OnInit, signal } from '@angular/core';
import { CalendarSmComponent } from '../../shared/components/calendar/calendar-sm/calendar-sm.component';
import { LayoutComponent } from '../../core/layout/layout.component';

import { RouterLink } from '@angular/router';
import { CalendarListService } from '../../services/calendar-list.service';
import { ScreenSizeService } from '../../services/screen-size.service';
import { CalendarListArticleComponent } from './calendar-list-article/calendar-list-article.component';

interface Calendar {
  id: string;
  background: string;
  sender: string;
  message: string;
  cases: { id: string; state: 'closed' | 'opened' }[];
}

@Component({
  selector: 'app-calendar-list-page',
  standalone: true,
  imports: [LayoutComponent, RouterLink, CalendarListArticleComponent],
  templateUrl: './calendar-list-page.component.html',
  styleUrls: ['./calendar-list-page.component.css'],
})
export class CalendarListPageComponent implements OnInit {
  headerIcon = 'assets/icons/chrismas_ball_gold.svg';
  headerTitle = 'Mes Calendrier';
  calendars = inject(CalendarListService).calendars;
  screenWidth = inject(ScreenSizeService).screenWidth;
  displayedCalendars = signal<Calendar[]>([]);
  displayedCreations = signal<Calendar[]>([]);
  calendarsPage = 0;
  creationsPage = 0;
  itemsPerPage = 1;

  ngOnInit(): void {
    this.updateDisplay('calendars');
    this.updateDisplay('creations');
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.updateDisplay('calendars');
    this.updateDisplay('creations');
  }

  nextPage(type: 'calendars' | 'creations'): void {
    const totalPages = Math.ceil(this.calendars.length / this.itemsPerPage);
    if (type === 'calendars') {
      this.calendarsPage = (this.calendarsPage + 1) % totalPages;
    } else {
      this.creationsPage = (this.creationsPage + 1) % totalPages;
    }
    this.updateDisplay(type);
  }

  prevPage(type: 'calendars' | 'creations'): void {
    const totalPages = Math.ceil(this.calendars.length / this.itemsPerPage);
    if (type === 'calendars') {
      this.calendarsPage = (this.calendarsPage - 1 + totalPages) % totalPages;
    } else {
      this.creationsPage = (this.creationsPage - 1 + totalPages) % totalPages;
    }
    this.updateDisplay(type);
  }

  updateDisplay(type: 'calendars' | 'creations'): void {
    // Determine items per page based on screen width
    if (this.screenWidth() < 960) {
      this.itemsPerPage = 1;
    } else if (this.screenWidth() < 1280) {
      this.itemsPerPage = 2;
    } else {
      this.itemsPerPage = 3;
    }

    const page = type === 'calendars' ? this.calendarsPage : this.creationsPage;
    const start = page * this.itemsPerPage;
    const end = start + this.itemsPerPage;

    const targetSignal =
      type === 'calendars' ? this.displayedCalendars : this.displayedCreations;
    targetSignal.set(this.calendars.slice(start, end));
  }
}
