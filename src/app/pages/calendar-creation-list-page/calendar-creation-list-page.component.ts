import { Component } from '@angular/core';
import { LayoutComponent } from '../../core/layout/layout.component';
import { CalendarListArticleComponent } from '../../shared/components/calendar-list-article/calendar-list-article.component';
import { CommonModule } from '@angular/common';

interface Calendar {
  id: string;
  background: string;
  sender: string;
  message: string;
}
@Component({
  selector: 'app-calendar-creation-list-page',
  standalone: true,
  imports: [LayoutComponent, CalendarListArticleComponent, CommonModule],
  templateUrl: './calendar-creation-list-page.component.html',
  styleUrl: './calendar-creation-list-page.component.css',
})
export class CalendarCreationListPageComponent {
  headerIcon = 'assets/icons/ribbon_gold.svg';
  headerTitle = 'Mes Création';

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
