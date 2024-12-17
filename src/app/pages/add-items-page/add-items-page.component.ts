import { Component, input } from '@angular/core';
import { LayoutComponent } from '../../core/layout/layout.component';
import { CommonModule } from '@angular/common';
import { CalendarFsComponent } from '../../shared/components/calendar/calendar-fs/calendar-fs.component';

@Component({
  selector: 'app-add-items-page',
  standalone: true,
  imports: [LayoutComponent, CommonModule, CalendarFsComponent],
  templateUrl: './add-items-page.component.html',
  styleUrl: './add-items-page.component.css',
})
export class AddItemsPageComponent {}
