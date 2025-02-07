import { DecimalPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { UploadService } from '../../../../../services/upload.service';
import { CalendarListService } from '../../../../../services/calendar.service';
import { CasesService } from '../../../../../services/cases.service';
import { DialogService } from '../../../../../services/dialog.service';
import { Case, CaseResponse } from '../../../../../models/case.models';
import { ImageService } from '../../../../../services/images.service';

@Component({
  selector: 'app-case-content',
  imports: [DecimalPipe],
  templateUrl: './case-content.component.html',
  styleUrls: ['./case-content.component.css'],
})
export class CaseContentComponent implements OnInit {
  //
  data = inject(MAT_DIALOG_DATA);
  dialog = inject(MatDialog);

  // Services injections
  casesService = inject(CasesService);
  dialogService = inject(DialogService);
  imageService = inject(ImageService);
  //
  message = ''; // Explicitly set as string
  caseData?: Case;
  uploadedImage: string | null = null;

  async ngOnInit(): Promise<void> {
    try {
      // Fetch case data
      this.caseData = await this.casesService.getCases(
        this.data.calendarId,
        this.data.caseNumber
      );

      // Fetch uploaded image URL
      this.uploadedImage = await this.getUploadedImage();
    } catch (error) {
      console.error('Error initializing component:', error);
      this.message = 'Failed to load case data or image.';
    }
  }

  onClick() {
    console.log(this.caseData);
  }

  onClose(): void {
    this.dialogService.closeAllDialogs();
  }

  async getUploadedImage(): Promise<string | null> {
    if (!this.caseData?.filePath) {
      console.warn('File path is undefined.');
      return null;
    }

    try {
      const blob = await this.imageService.getUploadImage(
        this.caseData.filePath
      );
      return blob ? URL.createObjectURL(blob) : null; // Convert Blob to a URL string
    } catch (error) {
      console.error('Error fetching uploaded image:', error);
      return null;
    }
  }
}
