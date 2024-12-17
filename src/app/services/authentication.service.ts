import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isConnected = signal(true);

  login(): void {
    this.isConnected.set(true);
  }

  logout(): void {
    this.isConnected.set(false);
  }
}
