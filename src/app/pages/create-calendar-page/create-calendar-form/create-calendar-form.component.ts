import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface ThemeOption {
  name: string;
  path: string;
}

@Component({
  selector: 'app-create-calendar-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-calendar-form.component.html',
  styleUrl: './create-calendar-form.component.css',
})
export class CreateCalendarFormComponent {
  themeOptions = input<ThemeOption[]>([]);
  selectedTheme = output<string>();
  email: string = '';

  onThemeSelect(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const selectedValue = target.value;
    this.selectedTheme.emit(selectedValue);
  }

  isFormValid(): boolean {
    return this.email ? true : false;
  }
}
