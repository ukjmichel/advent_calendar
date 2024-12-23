import { Component, inject, Signal } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isAuthenticated: Signal<boolean>;
  isSidebarOpen = false; // Track sidebar state

  constructor(
    private authService: AuthenticationService,
    private router: Router // Inject the Router service
  ) {
    this.isAuthenticated = this.authService.isAuthenticatedSignal;
  }

  // Toggle the sidebar open/close state
  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  isRouteActive(route: string): boolean {
    return this.router.url === route;
  }

  logout(): void {
    this.authService.logout();
    this.isSidebarOpen = false; // Ensure the sidebar is closed on logout

    // Navigate to the home page after logging out
    this.router.navigate(['/']).then((success) => {
      if (!success) {
        console.error('Navigation to / failed after logout.');
      }
    });
  }

}
