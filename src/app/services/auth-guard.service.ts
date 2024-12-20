import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);

  canActivate(): boolean {
    if (!this.authService.isConnected()) {
      this.router.navigate(['/sign']); // Redirect to the sign-in page if not authenticated
      return false;
    }
    return true;
  }
}
