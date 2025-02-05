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
import { ImageService } from '../../../../services/images.service';
import { CalendarListService } from '../../../../services/calendar-list.service';
import { Calendar } from '../../../../models/calendar.models';
import { CasesData } from '../../../../models/case.models';
import { DialogService } from '../../../../services/dialog.service';

@Component({
    selector: 'app-calendar-fs',
    imports: [CommonModule, DefaultCaseComponent],
    templateUrl: './calendar-fs.component.html',
    styleUrls: ['./calendar-fs.component.css']
})
export class CalendarFsComponent implements OnInit {
  calendarId = input<string>('');
  calendarDetail: Calendar | null = null;
  imageService = inject(ImageService);
  calendarService = inject(CalendarListService);
  dialogService = inject(DialogService);
  imagePath: string | null = '';
  background: string | null = null; // Update type to string | null
  cases = signal<CasesData | null>(null);

  constructor() {
    // Listen to the signal and trigger the function
    effect(() => {
      if (this.dialogService.refreshSignal()) {
        this.updateCases(); // Call the function when the signal changes
      }
    });
  }

  async ngOnInit(): Promise<void> {
    this.initCases();
  }

  async getBackground(): Promise<string | null> {
    const blob = await this.imageService.getImage(this.imagePath);
    return blob ? URL.createObjectURL(blob) : null; // Convert Blob to a URL string
  }

  async initCases() {
    this.updateCases();
    this.calendarDetail = await this.calendarService.getCalendars(
      this.calendarId()
    );
    this.imagePath = this.calendarDetail.image_path;
    this.background = await this.getBackground();
  }
  async updateCases() {
    this.cases.set(await this.calendarService.getCases(this.calendarId()));
    this.dialogService.unsetIsRefresh();
  }
}
