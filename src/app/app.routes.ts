import { Routes } from '@angular/router';
import { HomePagesComponent } from './pages/homepages/home-pages.component';
import { CreateCalendarPageComponent } from './pages/create-calendar-page/create-calendar-page.component';
import { CalendarPageComponent } from './pages/calendar-page/calendar-page.component';
import { SignInPageComponent } from './pages/sign-in-page/sign-in-page.component';
import { CalendarListPageComponent } from './pages/calendar-list-page/calendar-list-page.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';

export const routes: Routes = [
  { path: '', component: HomePagesComponent }, // Public route
  { path: 'sign', component: SignInPageComponent }, // Public route
  {
    path: 'calendars-list',
    component: CalendarListPageComponent,
    canActivate: [AuthGuardService], // Protected route
  },
  {
    path: 'new-calendar',
    component: CreateCalendarPageComponent,
    canActivate: [AuthGuardService], // Protected route
  },
  {
    path: 'calendar/:calendarId',
    component: CalendarPageComponent,
    canActivate: [AuthGuardService], // Protected route with dynamic param
  },
  {
    path: 'user',
    component: ProfilePageComponent,
    canActivate: [AuthGuardService], // Protected route with dynamic param
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }, // Fallback route
];
