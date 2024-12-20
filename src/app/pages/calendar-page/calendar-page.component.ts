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
export class CalendarPageComponent {
  calendarId = input<string>(); // Define `calendarId` as an input signal
  calendarService = inject(CalendarListService);

  // Computed signal to get the selected calendar dynamically
  selectedCalendar = computed(() => {
    const id = this.calendarId(); // Access the current value of the signal
    const calendar = this.calendarService.calendars.find(
      (cal) => cal.id === id
    );
    return calendar ?? this.calendarService.calendars[0]; // Default to the first calendar if not found
  });

  openCase(caseId: string) {
    this.calendarService.updateCase(this.selectedCalendar().id, caseId);
  }
}
