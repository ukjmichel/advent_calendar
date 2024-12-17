import { Component, input } from '@angular/core';
import { CalendarSmComponent } from '../../shared/components/calendar/calendar-sm/calendar-sm.component';
import { LayoutComponent } from '../../core/layout/layout.component';
import { CalendarListArticleComponent } from '../../shared/components/calendar-list-article/calendar-list-article.component';

@Component({
  selector: 'app-calendar-list-page',
  standalone: true,
  imports: [LayoutComponent, CalendarSmComponent, CalendarListArticleComponent],
  templateUrl: './calendar-list-page.component.html',
  styleUrl: './calendar-list-page.component.css',
})
export class CalendarListPageComponent {
  headerIcon = 'assets/icons/chrismas_ball_gold.svg';
  headerTitle = 'Mes Calendrier';
}
