import { Component, input } from '@angular/core';
import { CalendarSmComponent } from '../../../shared/components/calendar/calendar-sm/calendar-sm.component';

@Component({
  selector: 'app-calendar-list-article',
  standalone: true,
  imports: [CalendarSmComponent],
  templateUrl: './calendar-list-article.component.html',
  styleUrl: './calendar-list-article.component.css',
})
export class CalendarListArticleComponent {
  background = input<string>('');
  sender = input<string>('');
  message = input<string>('');
}
