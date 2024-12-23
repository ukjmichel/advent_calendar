import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
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
