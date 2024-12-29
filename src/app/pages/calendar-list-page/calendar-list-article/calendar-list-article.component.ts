import { Component, input, OnInit } from '@angular/core';
import { CalendarSmComponent } from '../../../shared/components/calendar/calendar-sm/calendar-sm.component';
import { RouterLink } from '@angular/router';

interface Calendar {
  id: string;
  background: string;
  sender: string;
  message: string;
  cases: { id: string; state: 'closed' | 'opened' }[];
}
@Component({
  selector: 'app-calendar-list-article',
  standalone: true,
  imports: [CalendarSmComponent, RouterLink],
  templateUrl: './calendar-list-article.component.html',
  styleUrl: './calendar-list-article.component.css',
})
export class CalendarListArticleComponent {
  calendar = input.required<Calendar>();
}
