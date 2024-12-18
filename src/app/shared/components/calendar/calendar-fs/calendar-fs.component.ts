import { CommonModule } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { DefaultCaseComponent } from '../cases/case.component';

@Component({
  selector: 'app-calendar-fs',
  standalone: true,
  imports: [CommonModule, DefaultCaseComponent],
  templateUrl: './calendar-fs.component.html',
  styleUrl: './calendar-fs.component.css',
})
export class CalendarFsComponent {
  cases = Array.from({ length: 24 }, (_, i) => i + 1);
  caseStates = Array.from({ length: 24 }, () =>
    signal<'closed' | 'opened' | 'empty'>('closed')
  );
  background = input<string>('assets/images/alley.png');

  onClick(index: number) {
    switch (this.caseStates[index]()) {
      case 'closed':
        this.caseStates[index].set('opened');
        break;
      case 'opened':
        this.caseStates[index].set('closed');
        break;
      default:
        break;
    }
  }
}
