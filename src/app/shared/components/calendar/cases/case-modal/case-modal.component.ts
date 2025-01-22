import { DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { UploadService } from '../../../../../services/upload.service';
import { FormsModule } from '@angular/forms';
import { CalendarListService } from '../../../../../services/calendar-list.service';
import { CasesService } from '../../../../../services/cases.service';
import { CaseState, UpdateCaseResponse } from '../../../../../models/case.models';
import { DialogService } from '../../../../../services/dialog.service';

@Component({
  selector: 'app-case-modal',
  standalone: true,
  imports: [DecimalPipe, FormsModule],
  templateUrl: './case-modal.component.html',
  styleUrls: ['./case-modal.component.css'], // Corrected `styleUrls`
})
export class CaseModalComponent {
  //
  data = inject(MAT_DIALOG_DATA);
  dialog = inject(MatDialog);

  // Services injections
  uploadService = inject(UploadService);
  calendarService = inject(CalendarListService);
  casesService = inject(CasesService);
  dialogService = inject(DialogService);
  //

  previewUrl: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  message = ''; // Explicitly set as string
  isDragging = false;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.[0]) {
      this.handleFile(input.files[0]);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false; // Reset dragging state
    const file = event.dataTransfer?.files?.[0];
    if (file) {
      this.handleFile(file);
    }
  }

  private handleFile(file: File): void {
    this.selectedFile = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onClose(): void {
    this.dialogService.closeAllDialogs();
  }

  async onSubmit(): Promise<void> {
    if (!this.selectedFile) {
      return;
    }

    const { calendarId, caseNumber } = this.data;

    try {
      // Upload the image
      const uploadResponse = await this.uploadService.uploadImage(
        this.selectedFile
      );
      console.log('Image uploaded successfully:', uploadResponse);

      // Construct the updates object
      const updates: {
        state?: CaseState;
        filePath?: string;
        message?: string;
      } = {
        state: 'closed',
        filePath: uploadResponse.resizedFile,
        message: this.message,
      };

      // Update the case
      const updateResponse = await this.casesService.updateCases(
        calendarId,
        caseNumber,
        updates
      );
      console.log('Case updated successfully:', updateResponse);

      // Show success alert and close the modal

      this.dialogService.closeAllDialogsAndUpdate();
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }
}
