import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-case',
  standalone: true,
  imports: [],
  templateUrl: './case.component.html',
  styleUrl: './case.component.css',
})
export class DefaultCaseComponent {
  caseNumber = input<number | string>(0);
  caseState = input<'closed' | 'opened' | 'empty'>('empty');
  caseOpened = output();

  openCase() {
    if (this.caseState() === 'closed') {
      this.caseOpened.emit();
    }
  }
}
