import { Component, input, OnInit } from '@angular/core';
import { CalendarSmComponent } from '../../../shared/components/calendar/calendar-sm/calendar-sm.component';
import { RouterLink } from '@angular/router';

interface Calendar {
  id: string;
  sender: string;
  receiver: string;
  message: string;
  created_at: string; // ISO date string
  image_path: string | null; // Nullable
}

@Component({
  selector: 'app-calendar-list-article',
  standalone: true,
  imports: [CalendarSmComponent, RouterLink],
  templateUrl: './calendar-list-article.component.html',
  styleUrl: './calendar-list-article.component.css',
})
export class CalendarListArticleComponent{
  headerIcon = 'assets/icons/chrismas_ball.svg';
  calendar = input<Calendar>();


}
