import {
  Component,
  HostListener,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { CalendarSmComponent } from '../../shared/components/calendar/calendar-sm/calendar-sm.component';
import { LayoutComponent } from '../../core/layout/layout.component';

import { RouterLink } from '@angular/router';
import { CalendarListService } from './calendar-list.service';
import { ScreenSizeService } from '../../services/screen-size.service';
import { CalendarListArticleComponent } from './calendar-list-article/calendar-list-article.component';

interface Calendar {
  id: string;
  background: string;
  sender: string;
  message: string;
}
@Component({
  selector: 'app-calendar-list-page',
  standalone: true,
  imports: [LayoutComponent, RouterLink, CalendarListArticleComponent],
  templateUrl: './calendar-list-page.component.html',
  styleUrl: './calendar-list-page.component.css',
})
export class CalendarListPageComponent implements OnInit {
  headerIcon = 'assets/icons/chrismas_ball_gold.svg';
  headerTitle = 'Mes Calendrier';
  calendars = inject(CalendarListService).calendars;
  screenWidth = inject(ScreenSizeService).screenWidth;
  displayedCalendars = signal<Calendar[]>([]);
  page = 0;
  itemsPerPage = 1;

  ngOnInit(): void {
    this.updateDisplayedCalendars();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.updateDisplayedCalendars(); // Recalculate displayed calendars
  }

  nextCalendars(): void {
    const totalPages = Math.ceil(this.calendars.length / this.itemsPerPage);
    this.page = (this.page + 1) % totalPages; // Wrap around to the first page
    this.updateDisplayedCalendars();
  }

  prevCalendars(): void {
    const totalPages = Math.ceil(this.calendars.length / this.itemsPerPage);
    this.page = (this.page - 1 + totalPages) % totalPages; // Wrap around to the last page
    this.updateDisplayedCalendars();
  }

  updateDisplayedCalendars(): void {
    // Determine items per page based on screen width
    if (this.screenWidth() < 960) {
      this.itemsPerPage = 1; // Display 1 item per page for small screens
    } else if (this.screenWidth() < 1280) {
      this.itemsPerPage = 2; // Display 2 items per page for medium screens
    } else {
      this.itemsPerPage = 3; // Display 3 items per page for larger screens
    }

    const start = this.page * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.displayedCalendars.set(this.calendars.slice(start, end)); // Update displayed calendars
  }
}
