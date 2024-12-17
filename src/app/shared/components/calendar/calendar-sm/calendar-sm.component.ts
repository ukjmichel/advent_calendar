import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-calendar-sm',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar-sm.component.html',
  styleUrl: './calendar-sm.component.css',
})
export class CalendarSmComponent {
  cases = Array.from({ length: 24 }, (_, i) => i + 1);
  background = input<string>('assets/images/alley.png');
}
