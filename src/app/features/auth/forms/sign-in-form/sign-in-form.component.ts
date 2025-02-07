import { Component, effect, inject } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { AuthComponentService } from '../../auth.component.service';
import { ScreenSizeService } from '../../../../services/screen-size.service';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.css'],
  imports: [FormsModule],
})
export class SignInFormComponent {
  formData = {
    email: '',
    password: '',
  };

  authPageService = inject(AuthComponentService);
  isSmallScreen = inject(ScreenSizeService).isSmallScreen;

  // Use `inject` for AuthenticationService and Router
  private authService = inject(AuthService);

  /**
   * Handles form submission using async/await and signals.
   * Calls the login method in AuthenticationService and navigates to /calendar-list on success.
   */
  onSubmit(form: any): void {
    if (!form.valid) {
      alert('Please fill in both email and password fields.');
      return;
    }

    this.authService
      .login(this.formData.email, this.formData.password)
      .subscribe({
        next: () => {
          console.log('Login successful');
        },
        error: (err) => {
          console.error('Login failed:', err.message);
        },
      });
  }

  /**
   * Toggles between sign-in and sign-up mode.
   */
  toggleAsAccount(): void {
    this.authPageService.toggleAsAccount();
  }
}
