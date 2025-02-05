import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
})
export class AppComponent {
  title = 'advent_calendar';

  private authService = inject(AuthenticationService);

  constructor() {
    // Initialize authentication state
    const token = localStorage.getItem('auth_token');
    if (token) {
      this.authService.isAuthenticatedSignal.set(true);
    }
  }
}
