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
export class CreateCalendarFormComponent {
  themeOptions = input<ThemeOption[]>([]);
  authService = inject(AuthService);
  calendarService = inject(CalendarListService);
  router = inject(Router);
  


  themeIsSelected = output<string>();
  sender=this.authService.user().id
  email: string = '';
  message: string = '';
  selectedTheme: string = 'images/alley.png';

  onThemeSelect(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedTheme = target.value;
    this.themeIsSelected.emit(this.selectedTheme);
  }

  OnSubmit() {
    // Log all fields for debugging
    console.log('Sender:', this.sender);
    console.log('Email:', this.email);
    console.log('Message:', this.message);
    console.log('Selected Theme:', this.selectedTheme);

    // Validate that all fields are filled
    if (!this.sender || !this.email || !this.message || !this.selectedTheme) {
      console.error('All fields are required');
      return;
    }

    try {
      this.calendarService.createNewCalendars(
        this.sender,
        this.email,
        this.message,
        this.selectedTheme
      );
      this.router.navigate(['calendars']);
    } catch (error) {
      console.error('Error during submission:', error);
    }
  }

  isFormValid(): boolean {
    return this.email ? true : false;
  }
}
