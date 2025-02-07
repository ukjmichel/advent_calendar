import { Component, inject, OnDestroy, signal } from '@angular/core';
import { LayoutComponent } from '../../core/layout/layout.component';
import { SignUpFormComponent } from './forms/sign-up-form/sign-up-form.component';
import { SignInFormComponent } from './forms/sign-in-form/sign-in-form.component';

import { AuthComponentService } from './auth.component.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-auth',
  imports: [LayoutComponent, SignInFormComponent, SignUpFormComponent],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnDestroy {
  private auth = inject(AuthService);

  // Reactive properties
  asAccount = inject(AuthComponentService).asAccount; // Signal for account state
  screenWidth = signal<number>(window.innerWidth); // Signal for screen width
  isAuthenticated = this.auth.isLogged(); // Signal for authentication state

  constructor() {
    // Add a listener for window resize events
    window.addEventListener('resize', this.updateScreenWidth);
  }

  private updateScreenWidth = (): void => {
    this.screenWidth.set(window.innerWidth);
  };

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.updateScreenWidth);
  }
}
