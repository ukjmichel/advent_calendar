import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment.development';

export interface Image {
  name: string;
  path: string;
}

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private apiUrl = environment.apiUrl; // Backend URL

  constructor(private http: HttpClient) {}

  // Fetch list of image names and paths using Promise<void>
  async getImagesList(): Promise<Image[]> {
    return firstValueFrom(this.http.get<Image[]>(`${this.apiUrl}api/images`));
  }

  // Fetch a specific image for preview using Promise<void>
  async getImage(imagePath: string | null): Promise<Blob> {
    const url = `${this.apiUrl}api/image-file?filePath=${imagePath}`;
    return firstValueFrom(this.http.get(url, { responseType: 'blob' }));
  }
}
