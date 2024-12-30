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
  sender: string;
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
  private apiUrl = environment.apiUrl + 'calendar/';
  private http = inject(HttpClient);
  authService = inject(AuthenticationService);

  async getSenderCalendars(sender_id: string): Promise<any> {
    try {
      const headers = this.authService.getAuthHeaders();
      const response = await firstValueFrom(
        this.http.get<CalendarsResponse>(`${this.apiUrl}sender/${sender_id}`, {
          headers,
        })
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching calendars for sender:', error);
      throw new Error(
        'An error occurred while retrieving calendars for the specified sender.'
      );
    }
  }

  async getReceiverCalendars(receiver_id: string): Promise<any> {
    try {
      const headers = this.authService.getAuthHeaders();
      const url = `${this.apiUrl}receiver/${receiver_id}`;
      const response = await firstValueFrom(
        this.http.get<CalendarsResponse>(url, { headers })
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching calendars for receiver:', error);
      throw new Error(
        'An error occurred while retrieving calendars for the specified receiver.'
      );
    }
  }

  async getCalendars(calendar_id: string) {
    const response = await firstValueFrom(
      this.http.get<CalendarResponse>(this.apiUrl + calendar_id)
    );
    return response.data;
  }

  async getCases(calendar_id: string) {
    const response = await firstValueFrom(
      this.http.get<CaseResponse>(this.apiUrl + 'cases/' + calendar_id)
    );
    return response.data;
  }

  async createNewCalendars(
    sender: string,
    receiver: string,
    message: string,
    image_path: string
  ): Promise<any> {
    console.log(sender, receiver, message, image_path);
    try {
      const headers = this.authService.getAuthHeaders();
      const response = await firstValueFrom(
        this.http.post<CalendarResponse>(
          this.apiUrl,
          { sender, receiver, message, image_path },
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
