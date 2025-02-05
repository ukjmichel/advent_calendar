import { Component, input, OnInit } from '@angular/core';
import { LayoutComponent } from '../../core/layout/layout.component';
import { CalendarFsComponent } from '../../shared/components/calendar/calendar-fs/calendar-fs.component';

@Component({
  selector: 'app-calendar-page',
  standalone: true,
  imports: [LayoutComponent, CalendarFsComponent],
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.css'],
})
export class CalendarPageComponent  {
  calendarId = input<string>(''); // Define `calendarId` as an input signal

}
