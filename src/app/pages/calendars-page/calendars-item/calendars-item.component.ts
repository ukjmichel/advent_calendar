import { Component, inject, input, OnInit } from '@angular/core';
import { CalendarSmComponent } from '../../../shared/components/calendar/calendar-sm/calendar-sm.component';
import { Calendar } from '../../../models/calendar.models';
import {} from '../../../services/auth-guard.service';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-calendars-item',
  standalone: true,
  imports: [CalendarSmComponent],
  templateUrl: './calendars-item.component.html',
  styleUrl: './calendars-item.component.css',
})
export class CalendarsItemComponent implements OnInit {
  headerIcon = 'assets/icons/chrismas_ball.svg';
  calendar = input<Calendar>();
  authService = inject(AuthenticationService);
  sender: string | null = '';

  async ngOnInit(): Promise<void> {
    this.sender = await this.authService.getUserName(this.calendar()!.senderId);
  }
}
