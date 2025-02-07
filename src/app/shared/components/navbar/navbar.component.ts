import { Component, inject, Signal } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectIsLogged } from '../../../store/auth/auth.selectors';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  authService = inject(AuthService);
  router = inject(Router);
  
  isSidebarOpen = false; // Track sidebar state

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
  }
}
