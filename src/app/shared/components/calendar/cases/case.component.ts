import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-case',
  standalone: true,
  imports: [],
  templateUrl: './case.component.html',
  styleUrl: './case.component.css',
})
export class DefaultCaseComponent {
  caseNumber = input<number>(0);
  caseState = input<'closed' | 'opened' | 'empty'>('empty');
}
