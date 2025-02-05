import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { AuthenticationService } from './authentication.service';

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
  authService = inject(AuthenticationService);

  async getSenderCalendars(): Promise<any> {
    try {
      const headers = this.authService.getAuthHeaders();
      const response = await firstValueFrom(
        this.http.get<CalendarsResponse>(`${this.apiUrl}/sended`, {
          headers,
        })
      );
      return response.data;
    } catch (error: any) {
      if (error.status === 404) {
        console.log('no calendar sended');
      } else {
        throw new Error(
          'An error occurred while retrieving calendars for the specified sender.'
        );
      }
    }
  }

  async getReceiverCalendars(): Promise<Calendar[]> {
    try {
      const headers = this.authService.getAuthHeaders();
      const url = `${this.apiUrl}/received`;
      const response = await firstValueFrom(
        this.http.get<CalendarsResponse>(url, { headers })
      );
      return response?.data || []; // Return an empty array if data is undefined
    } catch (error: any) {
      if (error.status === 404) {
        console.log('No calendar found');
        return []; // Return an empty array if no calendars are found
      } else {
        throw new Error(
          `An error occurred while retrieving calendars : ${
            error.message || 'Unknown error'
          }`
        );
      }
    }
  }

  async getCalendars(calendarId: string) {
    console.log(calendarId);
    const headers = this.authService.getAuthHeaders();
    const url = [this.apiUrl, calendarId].join('/');
    const response = await firstValueFrom(
      this.http.get<CalendarResponse>(url, { headers })
    );
    return response.data;
  }

  async getCases(calendarId: string): Promise<CaseResponse['data']> {
    const headers = this.authService.getAuthHeaders();
    const url = [this.apiUrl, calendarId, 'cases'].join('/');

    const response = await firstValueFrom(
      this.http.get<CaseResponse>(url, { headers })
    );
    return response.data;
  }

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
