import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { CalendarSmComponent } from '../../shared/components/calendar/calendar-sm/calendar-sm.component';
import { ContactFormComponent } from './contact-form/contact-form.component';


@Component({
  selector: 'app-homepages',
  imports: [
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
    'images/alley.png',
    'images/morning-light.jpg',
    'images/venise.webp',
  ];
}
