import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from "./core/layout/layout.component";
import { HomepagesComponent } from "./pages/homepages/homepages.component";
import { SignInPageComponent } from "./pages/sign-in-page/sign-in-page.component";
import { CalendarListPageComponent } from "./pages/calendar-list-page/calendar-list-page.component";
import { CalendarCreationListPageComponent } from "./pages/calendar-creation-list-page/calendar-creation-list-page.component";
import { CreateCalendarPageComponent } from "./pages/create-calendar-page/create-calendar-page.component";
import { AddItemsPageComponent } from "./pages/add-items-page/add-items-page.component";
import { CalendarPageComponent } from "./pages/calendar-page/calendar-page.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LayoutComponent, HomepagesComponent, SignInPageComponent, CalendarListPageComponent, CalendarCreationListPageComponent, CreateCalendarPageComponent, AddItemsPageComponent, CalendarPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'advent_calendar';
}
