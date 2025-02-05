import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import {
  AuthResponse,
  ProfileResponse,
  User,
  UsernameResponse,
} from '../models/auth.models';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private apiUrl = 'http://localhost:3000/auth'; // Replace with your API base URL

  router = inject(Router);
  http = inject(HttpClient);

  isAuthenticatedSignal: WritableSignal<boolean> = signal(this.hasToken());
  userProfile: WritableSignal<User | null> = signal(null);

  constructor() {
    this.initialize();
  }

  // Initialize service (fetch profile if token exists)
  private async initialize(): Promise<void> {
    if (this.hasToken()) {
      try {
        const profileResponse = await this.getProfile();
        this.userProfile.set(profileResponse.user);
        this.isAuthenticatedSignal.set(true);
      } catch (error) {
        console.error('Failed to initialize user profile:', error);
        this.logout(); // Clear token if fetching profile fails
      }
    }
  }

  // Login (POST request)
  async login(email: string, password: string): Promise<void> {
    try {
      const response = await firstValueFrom(
        this.http.post<AuthResponse>(`${this.apiUrl}/login`, {
          email,
          password,
        })
      );

      this.setToken(response.token);
      await this.initialize();
      await this.redirectToCalendarList(this.userProfile()!.id);
    } catch (error: any) {
      console.error('Login failed:', error);
      throw new Error(
        error?.error?.message || 'Login failed. Please try again.'
      );
    }
  }

  // Logout
  logout(): void {
    this.clearToken();
    this.userProfile.set(null);
    this.isAuthenticatedSignal.set(false);
  }

  // Register (POST request)
  async register(
    email: string,
    username: string,
    password: string
  ): Promise<void> {
    try {
      const response = await firstValueFrom(
        this.http.post<AuthResponse>(`${this.apiUrl}/register`, {
          email,
          username,
          password,
        })
      );
      this.setToken(response.token);
      await this.initialize(); // Fetch user profile after registration
      await this.redirectToCalendarList(this.userProfile()!.id);
    } catch (error: any) {
      console.error('Registration failed:', error);
      throw new Error(
        error?.error?.message || 'Registration failed. Please try again.'
      );
    }
  }

  // Fetch Profile (GET request)
  async getProfile(): Promise<ProfileResponse> {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token found. User is not authenticated.');
    }

    try {
      const profile = await firstValueFrom(
        this.http.get<ProfileResponse>(`${this.apiUrl}/profile`, {
          headers: this.getAuthHeaders(),
        })
      );
      return profile;
    } catch (error: any) {
      console.error('Failed to fetch profile:', error);
      throw new Error('Failed to fetch profile. Please try again.');
    }
  }

  async getUserName(id: string): Promise<string | null> {
    try {
      const response = await firstValueFrom(
        this.http.get<UsernameResponse>(`${this.apiUrl}/profile/${id}/username`, {
          headers: this.getAuthHeaders(),
        })
      );

      return response.username;
    } catch (error: any) {
      if (error.status === 404) {
        console.warn('No username found');
        return null; // Return null if no username is found
      }
      console.error('Failed to fetch profile:', error);
      throw new Error('Failed to fetch profile. Please try again.');
    }
  }

  private async redirectToCalendarList(userId: string): Promise<void> {
    try {
      await this.router.navigate(['calendars']);
    } catch (error) {
      console.error('Navigation to /calendars-list failed:', error);
    }
  }

  // Helper method to check if token exists
  private hasToken(): boolean {
    return !!this.getToken();
  }

  // Helper to get the token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Helper to set the token
  private setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Helper to clear the token
  private clearToken(): void {
    localStorage.removeItem('token');
  }

  // Helper to create authorization headers
  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }
}
