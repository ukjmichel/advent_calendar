import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isConnected = signal<boolean>(true);

  login(): void {
    this.isConnected.set(true);
  }

  logout(): void {
    this.isConnected.set(false);
  }
}
