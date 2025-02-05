import {
  Component,
  effect,
  inject,
  input,
  OnChanges,
  OnInit,
  output,
  signal,
  SimpleChanges,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CaseModalComponent } from './case-modal/case-modal.component';
import { DialogService } from '../../../../services/dialog.service';
import { CasesService } from '../../../../services/cases.service';

@Component({
    selector: 'app-case',
    imports: [], // Include necessary imports
    templateUrl: './case.component.html',
    styleUrls: ['./case.component.css']
})
export class DefaultCaseComponent {
  calendarId = input<string>(''); // Input signal for calendarId
  caseNumber = input<number>(0); // Input signal for case number
  caseUpdated = output();

  caseState = input<'closed' | 'opened' | 'empty'>('empty'); // Input signal for case state

  dialogService = inject(DialogService);
  caseService = inject(CasesService);
  isRefreshing = false;

  openCase(): void {
    if (!this.caseService.isEditting) {
      if (this.caseState() === 'closed') {
        this.caseService.updateCases(this.calendarId(), this.caseNumber(), {
          state: 'opened',
        });

        this.caseUpdated.emit();
      }
      if (this.caseState() === 'opened') {
        this.caseService.updateCases(this.calendarId(), this.caseNumber(), {
          state: 'closed',
        });

       
      }
      this.dialogService.openContentCaseDialog(
        this.calendarId(),
        this.caseNumber()
      );
       this.caseUpdated.emit();
    }

    if (this.caseService.isEditting) {
      this.dialogService.openEditCaseDialog(
        this.calendarId(),
        this.caseNumber()
      );
    }
  }
}
