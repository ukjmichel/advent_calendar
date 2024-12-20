import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { CalendarSmComponent } from '../../shared/components/calendar/calendar-sm/calendar-sm.component';
import { ContactFormComponent } from './contact-form/contact-form.component';

@Component({
  selector: 'app-homepages',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    FooterComponent,
    CalendarSmComponent,
    ContactFormComponent,
  ],
  templateUrl: './home-pages.component.html',
  styleUrl: './home-pages.component.css',
})
export class HomePagesComponent {
  // Liste des backgrounds pour chaque calendrier
  calendarBackgrounds: string[] = [
    'assets/images/alley.png',
    'assets/images/morning-light.jpg',
    'assets/images/venise.webp',
  ];
}
