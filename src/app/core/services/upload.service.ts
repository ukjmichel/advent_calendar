import { inject, Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { firstValueFrom } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private apiUrl = environment.apiUrl + 'upload'; // Base API URL
  private http = inject(HttpClient);
  authService = inject(AuthService);

  constructor() {}

  /**
   * Upload an image to the server
   * @param file - The image file to upload
   * @returns Promise for the HTTP POST request
   */
  async uploadImage(file: File): Promise<any> {
    // Create a FormData object to send the image as form-data
    const formData = new FormData();
    formData.append('image', file);

    // Set headers for the request
    const headers = this.authService.getAuthHeaders();

    // Convert Observable to Promise and return
    return firstValueFrom(this.http.post(this.apiUrl, formData, { headers }));
  }
}
