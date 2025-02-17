import { inject, Injectable, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Router } from '@angular/router';
import { CaseModalComponent } from '../../shared/components/calendar/cases/case-modal/case-modal.component';
import { CaseContentComponent } from '../../shared/components/calendar/cases/case-content/case-content.component';


@Injectable({
  providedIn: 'root',
})
export class DialogService {
  dialog = inject(MatDialog); // Inject MatDialog
  router = inject(Router);
  refreshSignal = signal<boolean>(false);

  openEditCaseDialog(calendarId: string, caseNumber: number) {
    const dialogRef = this.dialog.open(CaseModalComponent, {
      data: { caseNumber, calendarId },
    });
    console.log('Dialog opened with data:', {
      caseNumber: caseNumber,
      calendarId: calendarId,
    });
  }

  openContentCaseDialog(calendarId: string, caseNumber: number) {
    const dialogRef = this.dialog.open(CaseContentComponent, {
      data: { caseNumber, calendarId },
    });
    console.log('Dialog opened with data:', {
      caseNumber: caseNumber,
      calendarId: calendarId,
    });
  }

  closeAllDialogs(): void {
    this.dialog.closeAll();
  }

  closeAllDialogsAndUpdate(): void {
    // window.location.reload();
    this.setIsRefresh();
    this.dialog.closeAll();
  }

  setIsRefresh() {
    console.log(this.refreshSignal());
    this.refreshSignal.set(true);
  }
  unsetIsRefresh() {
    this.refreshSignal.set(false);
  }
}
