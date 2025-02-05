import {
  Component,
  inject,
  input,
  OnChanges,
  OnInit,
  signal,
  Signal,
  SimpleChanges,
} from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-navbar',
    imports: [RouterLink],
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isAuthenticated = signal<boolean>(false);
  isSidebarOpen = false; // Track sidebar state

  authService = inject(AuthenticationService);
  router = inject(Router);
  userId = this.authService.userProfile()?.id;

  ngOnInit(): void {
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
