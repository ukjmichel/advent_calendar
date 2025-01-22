import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { CaseResponse, CasesResponse, CaseState } from '../models/case.models';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CasesService {
  private apiUrl = ' http://localhost:3000'; // Use environment config for the base URL
  private http = inject(HttpClient); // Inject HttpClient
  private authService = inject(AuthenticationService);

  isEditting: boolean = false;

  setIsEditing() {
    this.isEditting = true;
  }

  cancelIsEditting() {
    this.isEditting = false;
  }

  constructor() {}

  async getCases(
    calendarId: string,
    caseNumber: number
  ): Promise<CaseResponse['data']> {
    try {
      const headers = this.authService.getAuthHeaders();
      const url = [
        this.apiUrl,
        'calendar',
        'cases',
        calendarId,
        caseNumber,
      ].join('/');

      const response = await firstValueFrom(
        this.http.get<CaseResponse>(url, { headers })
      );

      return response.data;
    } catch (error) {
      console.error('Failed to fetch cases:', error);
      throw error; // Handle this appropriately in your component
    }
  }

  async updateCases(
    calendarId: string,
    caseId: number,
    updates?: {
      state?: CaseState;
      filePath?: string;
      message?: string;
    }
  ): Promise<CasesResponse> {
    try {
      const headers = this.authService.getAuthHeaders();
      const url = `${this.apiUrl}/calendar/cases/${calendarId}/${caseId}`;

      // Construct the body dynamically without the `updates` wrapper
      const body: Partial<{
        state: CaseState;
        filePath: string;
        message: string;
      }> = {};

      // Dynamically assign properties
      if (updates?.state !== undefined) body.state = updates.state;
      if (updates?.filePath !== undefined) body.filePath = updates.filePath;
      if (updates?.message !== undefined) body.message = updates.message;

      // Await the HTTP response
      const response = await firstValueFrom(
        this.http.patch<CasesResponse>(url, body, { headers })
      );

      return response;
    } catch (error: any) {
      console.error('Failed to update case:', error);

      // Enhance error handling
      if (error.response?.data?.message) {
        console.error('Server error message:', error.response.data.message);
      }

      throw error; // Rethrow the error to handle it further up the call chain
    }
  }
}
