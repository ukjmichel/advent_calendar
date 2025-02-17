import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../core/services/auth.service';

interface CalendarsResponse {
  message: string;
  data: Calendar[];
}
interface CalendarResponse {
  message: string;
  data: Calendar;
}

interface Calendar {
  id: string;
  senderId: string;
  receiver: string;
  message: string;
  created_at: string; // ISO date string
  image_path: string; // Path to the associated image
}

export interface CaseResponse {
  message: string;
  data: CaseData;
}

export interface CaseData {
  _id: string;
  calendarId: string;
  cases: Case[];
  __v: number;
}

export interface Case {
  number: number;
  state: 'closed' | 'opened' | 'empty'; // "closed" or "open" based on your application's logic
  filePath: string;
  message: string;
  _id: string;
}

@Injectable({
  providedIn: 'root',
})
export class CalendarListService {
  private apiUrl = environment.apiUrl + 'calendar';
  private http = inject(HttpClient);
  authService = inject(AuthService);

  async createNewCalendars(
    senderId: string = '',
    receiver: string = '',
    message: string = '',
    image_path: string = ''
  ): Promise<any> {
    try {
      const headers = this.authService.getAuthHeaders();
      const response = await firstValueFrom(
        this.http.post<CalendarResponse>(
          this.apiUrl,
          { senderId, receiver, message, image_path },
          { headers }
        )
      );
      return response.data;
    } catch (error) {
      console.error('Error creating new calendar:', error);
      throw new Error(
        'An error occurred while creating the calendar. Please try again later.'
      );
    }
  }
}
