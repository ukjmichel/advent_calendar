import {
  Component,
  inject,
  OnDestroy,
  signal,

} from '@angular/core';
import { LayoutComponent } from '../../core/layout/layout.component';
import { SignUpFormComponent } from './forms/sign-up-form/sign-up-form.component';
import { AuthenticationService } from '../../services/authentication.service';
import { SignInFormComponent } from './forms/sign-in-form/sign-in-form.component';
import { SignInPageService } from './sign-in-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in-page',
  standalone: true,
  imports: [LayoutComponent, SignInFormComponent, SignUpFormComponent],
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.css'],
})
export class SignInPageComponent implements OnDestroy {
  private authService = inject(AuthenticationService);
  private router = inject(Router);

  // Reactive properties
  asAccount = inject(SignInPageService).asAccount; // Signal for account state
  screenWidth = signal<number>(window.innerWidth); // Signal for screen width
  isAuthenticated = this.authService.isAuthenticatedSignal; // Signal for authentication state

  constructor() {
    // Add a listener for window resize events
    window.addEventListener('resize', this.updateScreenWidth);

    // Reactive effect to handle authentication changes
    // effect(() => {
    //   if (this.isAuthenticated()) {
    //     this.redirectToCalendarList();
    //   }
    // });
  }

  private updateScreenWidth = (): void => {
    this.screenWidth.set(window.innerWidth);
  };

  // private async redirectToCalendarList(): Promise<void> {
  //   try {
  //     await this.router.navigate(['/calendar-list']);
  //     console.log('Redirection to /calendar-list successful');
  //   } catch (error) {
  //     console.error('Navigation to /calendar-list failed:', error);
  //   }
  // }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.updateScreenWidth);
  }
}
