import { CommonModule } from '@angular/common';
import {
  Component,
  input,
  computed,
  OnInit,
  output,
  inject,
} from '@angular/core';
import { DefaultCaseComponent } from '../cases/case.component';
import { ImageService } from '../../../../services/images.service';
import { CalendarListService } from '../../../../services/calendar-list.service';

export interface CaseResponse {
  message: string;
  data: CaseData;
}

interface Calendar {
  id: string;
  sender: string;
  receiver: string;
  message: string;
  created_at: string; // ISO date string
  image_path: string; // Path to the associated image
}

export interface CaseData {
  _id: string;
  calendarId: string;
  cases: Case[];
  __v: number;
}

export interface Case {
  number: number;
  state: 'closed' | 'opened' | 'empty'; // "closed" or "open" based on your application's logic
  filePath: string;
  message: string;
  _id: string;
}

@Component({
  selector: 'app-calendar-fs',
  standalone: true,
  imports: [CommonModule, DefaultCaseComponent],
  templateUrl: './calendar-fs.component.html',
  styleUrls: ['./calendar-fs.component.css'], // Fixed typo
})
export class CalendarFsComponent implements OnInit {
  calendarId = input<string>('');
  calendarDetail: Calendar | null = null;
  imageService = inject(ImageService);
  calendarService = inject(CalendarListService);
  imagePath: string | null = '';
  background: string | null = null; // Update type to string | null
  cases: CaseData | null = null;

  async getBackground(): Promise<string | null> {
    const blob = await this.imageService.getImage(this.imagePath);
    return blob ? URL.createObjectURL(blob) : null; // Convert Blob to a URL string
  }

  async ngOnInit(): Promise<void> {
    this.cases = await this.calendarService.getCases(this.calendarId());
    this.calendarDetail = await this.calendarService.getCalendars(
      this.calendarId()
    );
    this.imagePath = this.calendarDetail.image_path;
    this.background = await this.getBackground();
  }
}
