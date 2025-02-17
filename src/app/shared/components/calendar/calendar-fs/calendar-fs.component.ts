import { CommonModule } from '@angular/common';
import {
  Component,
  input,
  OnInit,
  inject,
  OnChanges,
  SimpleChanges,
  signal,
  effect,
} from '@angular/core';
import { DefaultCaseComponent } from '../cases/case.component';
import { ImageService } from '../../../../core/services/images.service';
import { CalendarListService } from '../../../../services/calendar.service';

import { CalendarService } from '../../../../core/services/calendar.service';
import { DialogService } from '../../../../core/services/dialog.service';

@Component({
  selector: 'app-calendar-fs',
  imports: [CommonModule, DefaultCaseComponent],
  templateUrl: './calendar-fs.component.html',
  styleUrls: ['./calendar-fs.component.css'],
})
export class CalendarFsComponent implements OnInit {
  calendarId = input<string>('');
  //
  calendarService = inject(CalendarService);
  imageService = inject(ImageService);
  calendarCaseService = inject(CalendarListService);
  dialogService = inject(DialogService);
  //
  calendar = this.calendarService.selectedCalendar;
  background: string | null = null; // Update type to string | null

  cases = this.calendarService.casesOfSelectedCalendar;

  constructor() {
    this.calendarService.loadCalendar(this.calendarId());
    // Listen to the signal and trigger the function
    effect(() => {
      if (this.dialogService.refreshSignal()) {
        this.updateCases(); // Call the function when the signal changes
      }
    });
    effect(() => {
      if (this.calendar()) {
        //console.log('[CalendarFsComponent] Calendar Loaded:', this.calendar());
        this.updateCases();
      }
      if (this.calendar()?.image_path) {
        this.getBackground(this.calendar()?.image_path);
      }
    });
  }

  ngOnInit(): void {
    this.calendarService.loadCalendar(this.calendarId());
  }

  async getBackground(path: string | null | undefined) {
    if (path) {
      const blob = await this.imageService.getImage(path);
      this.background = blob ? URL.createObjectURL(blob) : null; // Convert Blob to a URL string
    }
  }

  updateCases() {
    this.calendarService.loadCases(this.calendarId());
    this.dialogService.unsetIsRefresh();
  }
}
