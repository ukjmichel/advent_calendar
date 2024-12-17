import { Component, input, OnInit } from '@angular/core';
import { LayoutComponent } from '../../core/layout/layout.component';
import { CalendarListArticleComponent } from '../../shared/components/calendar-list-article/calendar-list-article.component';

@Component({
  selector: 'app-calendar-creation-list-page',
  standalone: true,
  imports: [LayoutComponent, CalendarListArticleComponent],
  templateUrl: './calendar-creation-list-page.component.html',
  styleUrl: './calendar-creation-list-page.component.css',
})
export class CalendarCreationListPageComponent {
  headerIcon = 'assets/icons/ribbon_gold.svg';
  headerTitle = 'Mes Création';
}
