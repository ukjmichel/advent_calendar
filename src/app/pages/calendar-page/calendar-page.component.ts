import { Component, inject, input, computed, OnInit } from '@angular/core';
import { LayoutComponent } from '../../core/layout/layout.component';
import { CalendarFsComponent } from '../../shared/components/calendar/calendar-fs/calendar-fs.component';
import { CalendarListService } from '../../services/calendar-list.service';

interface Calendar {
  id: string;
  background: string;
  sender: string;
  message: string;
  cases: { id: string; state: 'closed' | 'opened' }[];
}

@Component({
  selector: 'app-calendar-page',
  standalone: true,
  imports: [LayoutComponent, CalendarFsComponent],
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.css'],
})
export class CalendarPageComponent implements OnInit {
  calendarId = input<string>(''); // Define `calendarId` as an input signal

  ngOnInit(): void {
    console.log(this.calendarId());
  }
}
