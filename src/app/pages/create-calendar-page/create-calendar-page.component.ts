import { Component, inject, OnInit, signal } from '@angular/core';
import { LayoutComponent } from '../../core/layout/layout.component';
import { CreateCalendarFormComponent } from './create-calendar-form/create-calendar-form.component';
import { ImageService } from '../../services/images.service';
import { CalendarSmComponent } from '../../shared/components/calendar/calendar-sm/calendar-sm.component';

interface ThemeOption {
  name: string;
  path: string;
}

@Component({
  selector: 'app-create-calendar-page',
  standalone: true,
  imports: [LayoutComponent, CreateCalendarFormComponent, CalendarSmComponent],
  templateUrl: './create-calendar-page.component.html',
  styleUrls: ['./create-calendar-page.component.css'], // Fixed typo
})
export class CreateCalendarPageComponent implements OnInit {
  headerIcon = 'assets/icons/plus_gold.svg';
  headerTitle = 'Modele';
  themeOptions: ThemeOption[] = [];
  imagesService = inject(ImageService);
  selectedTheme = signal<string>('images/alley.png');


  async getThemesOptions(): Promise<ThemeOption[]> {
    try {
      const response = await this.imagesService.getImagesList();
      return response;
    } catch (error) {
      console.error('Failed to fetch theme options:', error);
      return [];
    }
  }

  async ngOnInit(): Promise<void> {
    this.themeOptions = await this.getThemesOptions();
    if (this.themeOptions.length > 0) {
      this.selectedTheme.set(this.themeOptions[0].path);
    } else {
      console.warn('No themes available');
    }
    
  }

 

  updateSelectedTheme(theme: string) {
    this.selectedTheme.set(theme);
  }
}
