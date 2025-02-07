import { Component, inject, input, OnInit } from '@angular/core';
import { CalendarSmComponent } from '../../../shared/components/calendar/calendar-sm/calendar-sm.component';
import { Calendar } from '../../../core/models/calendar.models';
import {} from '../../../core/guards/auth-guard.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-calendars-item',
  imports: [CalendarSmComponent],
  templateUrl: './calendars-item.component.html',
  styleUrl: './calendars-item.component.css',
})
export class CalendarsItemComponent  {
  headerIcon = 'assets/icons/chrismas_ball.svg';
  calendar = input<Calendar>();
  authService = inject(AuthService);
  sender: string | null = '';

 
}
