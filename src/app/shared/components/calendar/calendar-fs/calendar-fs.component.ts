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

interface Calendar {
  id: string;
  background: string;
  sender: string;
  message: string;
  cases: { id: string; state: 'closed' | 'opened' }[];
}

@Component({
  selector: 'app-calendar-fs',
  standalone: true,
  imports: [CommonModule, DefaultCaseComponent],
  templateUrl: './calendar-fs.component.html',
  styleUrls: ['./calendar-fs.component.css'], // Fixed typo
})
export class CalendarFsComponent implements OnInit {
  calendar = input.required<Calendar>();
  openedCase = output<string>();
  cases = computed(() => this.calendar().cases);
  imagesService = inject(ImageService);
  background: string | null = null; // Update type to string | null

  async getBackground(): Promise<string | null> {
    const blob = await this.imagesService.getImage(this.calendar().background);
    return blob ? URL.createObjectURL(blob) : null; // Convert Blob to a URL string
  }

  async ngOnInit(): Promise<void> {
    if (this.calendar().background) {
      this.background = await this.getBackground(); // Assign string URL to background
    }
  }
  openCase(caseId: string) {
    this.openedCase.emit(caseId);
  }
}
