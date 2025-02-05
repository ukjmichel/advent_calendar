import { Component, input, OnInit } from '@angular/core';
import { LayoutComponent } from "../../core/layout/layout.component";
import { CalendarFsComponent } from "../../shared/components/calendar/calendar-fs/calendar-fs.component";
@Component({
    selector: 'app-calendar-edit-page',
    imports: [LayoutComponent, CalendarFsComponent],
    templateUrl: './calendar-edit-page.component.html',
    styleUrl: './calendar-edit-page.component.css'
})
export class CalendarEditPageComponent implements OnInit {
  calendarId = input<string>(''); // Define `calendarId` as an input signal

  ngOnInit(): void {
    console.log(this.calendarId());
  }
}
