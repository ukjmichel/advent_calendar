import { Component, inject, input, OnInit, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { CalendarListService } from '../../../services/calendar.service';
import { Router } from '@angular/router';
import { ProfileResponse } from '../../../models/auth.models';

interface ThemeOption {
  name: string;
  path: string;
}

@Component({
  selector: 'app-create-calendar-form',
  imports: [FormsModule],
  templateUrl: './create-calendar-form.component.html',
  styleUrl: './create-calendar-form.component.css',
})
export class CreateCalendarFormComponent  {
  themeOptions = input<ThemeOption[]>([]);
  themeIsSelected = output<string>();
  authService = inject(AuthService);
  calendarService = inject(CalendarListService);
  router = inject(Router);
  sender: string = '';
  email: string = '';
  message: string = '';
  selectedTheme: string = 'images/alley.png';



  onThemeSelect(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedTheme = target.value;
    this.themeIsSelected.emit(this.selectedTheme);
  }

  OnSubmit() {
    try {
      this.calendarService.createNewCalendars(
        this.sender,
        this.email,
        this.message,
        this.selectedTheme
      );
      this.router.navigate(['calendars']);
    } catch (error) {
      console.error(error);
    }
  }

  isFormValid(): boolean {
    return this.email ? true : false;
  }
}
