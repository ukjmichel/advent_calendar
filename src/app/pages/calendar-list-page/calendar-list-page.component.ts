import { Component, input } from '@angular/core';
import { CalendarSmComponent } from '../../shared/components/calendar/calendar-sm/calendar-sm.component';
import { LayoutComponent } from '../../core/layout/layout.component';
import { CalendarListArticleComponent } from '../../shared/components/calendar-list-article/calendar-list-article.component';

interface Calendar {
  id: string;
  background: string;
  sender: string;
  message: string;
}
@Component({
  selector: 'app-calendar-list-page',
  standalone: true,
  imports: [LayoutComponent, CalendarListArticleComponent],
  templateUrl: './calendar-list-page.component.html',
  styleUrl: './calendar-list-page.component.css',
})
export class CalendarListPageComponent {
  headerIcon = 'assets/icons/chrismas_ball_gold.svg';
  headerTitle = 'Mes Calendrier';

  calendars: Calendar[] = [
    {
      id: '1',
      background: 'assets/images/alley.png',
      sender: '####',
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    },
    {
      id: '2',
      background: 'assets/images/morning-light.jpg',
      sender: '####',
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    },
    {
      id: '3',
      background: 'assets/images/venise.webp',
      sender: '####',
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    },
    {
      id: '4',
      background: 'assets/images/alley.png',
      sender: '####',
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    },
    {
      id: '5',
      background: 'assets/images/morning-light.jpg',
      sender: '####',
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    },
    {
      id: '6',
      background: 'assets/images/venise.webp',
      sender: '####',
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    },
  ];
}
