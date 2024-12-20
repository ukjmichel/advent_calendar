import { CommonModule } from '@angular/common';
import { Component, input, computed, OnInit, output } from '@angular/core';
import { DefaultCaseComponent } from '../cases/case.component';

interface Calendar {
  id: string;
  background: string;
  sender: string;
  message: string;
  cases: { id: string; state: 'closed' | 'opened' }[];
}

@Component({
  selector: 'app-calendar-fs',
  standalone: true,
  imports: [CommonModule, DefaultCaseComponent],
  templateUrl: './calendar-fs.component.html',
  styleUrls: ['./calendar-fs.component.css'], // Fixed typo
})
export class CalendarFsComponent {
  calendar = input.required<Calendar>();
  openedCase = output<string>();

  // Computed signals for reactive properties
  cases = computed(() => this.calendar().cases);
  background = computed(() => this.calendar().background);

  openCase(caseId: string) {
    this.openedCase.emit(caseId);
  }
}
