import { Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

interface AuthResponse {
  token: string;
  message?: string;
}

interface ProfileResponse {
  message: string;
  user: User;
}

interface User {
  email: string;
  exp: number;
  iat: number;
  id: string;
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private apiUrl = 'http://localhost:3000/auth'; // Replace with your API base URL

  isAuthenticatedSignal: WritableSignal<boolean> = signal(this.hasToken());
  userProfile: WritableSignal<User | null> = signal(null);

  constructor(private http: HttpClient) {
    this.initialize();
  }

  // Initialize service (fetch profile if token exists)
  private async initialize(): Promise<void> {
    if (this.hasToken()) {
      try {
        const profileResponse = await this.getProfile();
        this.userProfile.set(profileResponse.user);
        this.isAuthenticatedSignal.set(true);
        console.log('User profile initialized:', this.userProfile);
      } catch (error) {
        console.error('Failed to initialize user profile:', error);
        this.logout(); // Clear token if fetching profile fails
      }
    }
  }

  // Login (POST request)
  async login(email: string, password: string): Promise<void> {
    try {
      console.log('Attempting login:', email);
      const response = await firstValueFrom(
        this.http.post<AuthResponse>(`${this.apiUrl}/login`, {
          email,
          password,
        })
      );
      this.setToken(response.token);
      await this.initialize(); // Fetch user profile after login
      console.log('Login successful');
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
    console.log('User logged out');
  }

  // Register (POST request)
  async register(
    email: string,
    username: string,
    password: string
  ): Promise<void> {
    try {
      console.log('Attempting registration');
      const response = await firstValueFrom(
        this.http.post<AuthResponse>(`${this.apiUrl}/register`, {
          email,
          username,
          password,
        })
      );
      this.setToken(response.token);
      await this.initialize(); // Fetch user profile after registration
      console.log('Registration successful');
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
      console.log('Fetched profile:', profile);
      return profile;
    } catch (error: any) {
      console.error('Failed to fetch profile:', error);
      throw new Error('Failed to fetch profile. Please try again.');
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
