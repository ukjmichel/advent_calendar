import { Routes } from '@angular/router';
import { HomePagesComponent } from './pages/homepages/home-pages.component';
import { CreateCalendarPageComponent } from './pages/create-calendar-page/create-calendar-page.component';
import { CalendarPageComponent } from './pages/calendar-page/calendar-page.component';
import { SignInPageComponent } from './pages/sign-in-page/sign-in-page.component';
import { CalendarListPageComponent } from './pages/calendar-list-page/calendar-list-page.component';
import { AuthGuard } from './services/auth-guard.service';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';

export const routes: Routes = [
  { path: '', component: HomePagesComponent }, // Public route
  { path: 'sign', component: SignInPageComponent }, // Public route
  {
    path: 'calendar-list',
    component: CalendarListPageComponent,
    canActivate: [AuthGuard], // Protected route
  },
  {
    path: 'new-calendar',
    component: CreateCalendarPageComponent,
    canActivate: [AuthGuard], // Protected route
  },
  {
    path: 'calendar/:calendarId',
    component: CalendarPageComponent,
    canActivate: [AuthGuard], // Protected route with dynamic param
  },
  {
    path: 'user',
    component: ProfilePageComponent,
    canActivate: [AuthGuard], // Protected route with dynamic param
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }, // Fallback route
];
