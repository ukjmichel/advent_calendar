import { Component, inject, signal } from '@angular/core';
import { LayoutComponent } from '../../core/layout/layout.component';
import { CalendarSmComponent } from '../../shared/components/calendar/calendar-sm/calendar-sm.component';
import { CreateCalendarFormComponent } from './create-calendar-form/create-calendar-form.component';
import { DataService } from '../../services/data.service';

interface ThemeOption {
  name: string;
  path: string;
}
@Component({
  selector: 'app-create-calendar-page',
  standalone: true,
  imports: [LayoutComponent, CalendarSmComponent, CreateCalendarFormComponent],
  templateUrl: './create-calendar-page.component.html',
  styleUrl: './create-calendar-page.component.css',
})
export class CreateCalendarPageComponent {
  headerIcon = 'assets/icons/plus_gold.svg';
  headerTitle = ' Modele';
  themeOptions = inject(DataService).models;
  selectedTheme = signal<string>(this.themeOptions[0].path);

  updateTheme(theme: string) {
    this.selectedTheme.set(theme);
  }
}
