import { Routes } from '@angular/router';
import { HomePagesComponent } from './pages/homepages/home-pages.component';
import { CreateCalendarPageComponent } from './pages/create-calendar-page/create-calendar-page.component';
import { CalendarPageComponent } from './pages/calendar-page/calendar-page.component';
import { SignInPageComponent } from './pages/sign-in-page/sign-in-page.component';
import { CalendarsPageComponent } from './pages/calendars-page/calendars-page.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { CalendarEditPageComponent } from './pages/calendar-edit-page/calendar-edit-page.component';
import { isNotEdittingResolver } from './resolvers/is-not-editting.resolver';
import { isEdittingResolver } from './resolvers/is-editting.resolver';

export const routes: Routes = [
  { path: '', component: HomePagesComponent }, // Public route
  { path: 'sign', component: SignInPageComponent }, // Public route
  {
    path: 'calendars',
    component: CalendarsPageComponent,
    canActivate: [AuthGuardService], // Protected route
  },
  {
    path: 'new-calendar',
    component: CreateCalendarPageComponent,
    canActivate: [AuthGuardService], // Protected route
  },
  {
    path: 'calendars/:calendarId',
    component: CalendarPageComponent,
    canActivate: [AuthGuardService], // Protected route with dynamic param
    resolve: {
      isEditing: isNotEdittingResolver, // Attach the resolver
    },
  },
  {
    path: 'calendars/:calendarId/edit',
    component: CalendarEditPageComponent,
    canActivate: [AuthGuardService], // Protected route with dynamic param
    resolve: {
      isEditing: isEdittingResolver, // Attach the resolver
    },
  },
  {
    path: 'user',
    component: ProfilePageComponent,
    canActivate: [AuthGuardService], // Protected route with dynamic param
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }, // Fallback route
];
