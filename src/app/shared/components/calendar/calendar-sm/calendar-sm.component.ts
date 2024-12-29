import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  input,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ImageService } from '../../../../services/images.service';

@Component({
  selector: 'app-calendar-sm',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar-sm.component.html',
  styleUrls: ['./calendar-sm.component.css'], // Corrected `styleUrls`
})
export class CalendarSmComponent implements OnInit, OnChanges {
  imagePath = input<string>('');
  cases = Array.from({ length: 24 }, (_, i) => i + 1);
  imageService = inject(ImageService);
  background: string | null = null; // Update type to string | null

  async getBackground(): Promise<string | null> {
    const blob = await this.imageService.getImage(this.imagePath());
    return blob ? URL.createObjectURL(blob) : null; // Convert Blob to a URL string
  }

  async ngOnInit(): Promise<void> {
    if (this.imagePath()) {
      this.background = await this.getBackground(); // Assign string URL to background
    }
  }

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if (changes['imagePath']) {
      this.background = await this.getBackground();
    }
  }
}
