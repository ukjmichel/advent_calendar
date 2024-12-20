import { Routes } from '@angular/router';
import { HomePagesComponent } from './pages/homepages/home-pages.component';
import { CreateCalendarPageComponent } from './pages/create-calendar-page/create-calendar-page.component';
import { CalendarPageComponent } from './pages/calendar-page/calendar-page.component';
import { SignInPageComponent } from './pages/sign-in-page/sign-in-page.component';
import { CalendarListPageComponent } from './pages/calendar-list-page/calendar-list-page.component';
import { AuthGuard } from './services/auth-guard.service';

export const routes: Routes = [
  { path: '', component: HomePagesComponent },
  { path: 'sign', component: SignInPageComponent },
  {
    path: 'calendar-list',
    component: CalendarListPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'new-calendar',
    component: CreateCalendarPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'calendar/:calendarId',
    component: CalendarPageComponent,
    canActivate: [AuthGuard],
  },
];
