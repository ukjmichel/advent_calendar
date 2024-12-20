import { Component, inject, input, OnInit } from '@angular/core';
import { LayoutComponent } from '../../core/layout/layout.component';
import { CalendarFsComponent } from '../../shared/components/calendar/calendar-fs/calendar-fs.component';
import { CalendarListService } from '../calendar-list-page/calendar-list.service';

interface Calendar {
  id: string;
  background: string;
  sender: string;
  message: string;
}
@Component({
  selector: 'app-calendar-page',
  standalone: true,
  imports: [LayoutComponent, CalendarFsComponent],
  templateUrl: './calendar-page.component.html',
  styleUrl: './calendar-page.component.css',
})
export class CalendarPageComponent implements OnInit {
  calendarId = input<string>();
  calendarService = inject(CalendarListService);
  calendar?: Calendar;

  ngOnInit(): void {
    // Find the calendar matching the calendarId
    this.calendar = this.calendarService.calendars.find(
      (calendar) => calendar.id === this.calendarId()
    );

    if (!this.calendar) {
      console.error(`Calendar with ID ${this.calendarId} not found.`);
    }
  }
}
