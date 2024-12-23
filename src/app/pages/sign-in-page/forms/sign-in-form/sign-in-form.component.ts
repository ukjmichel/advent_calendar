import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../../services/authentication.service';
import { FormsModule } from '@angular/forms';
import { SignInPageService } from '../../sign-in-service.service';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.css'],
  imports: [FormsModule],
  standalone: true,
})
export class SignInFormComponent {
  formData = {
    email: '',
    password: '',
  };

  signService = inject(SignInPageService);

  // Use `inject` for AuthenticationService and Router
  private authService = inject(AuthenticationService);
  private router = inject(Router);

  /**
   * Handles form submission using async/await and signals.
   * Calls the login method in AuthenticationService and navigates to /calendar-list on success.
   */
  async onSubmit(form: any): Promise<void> {
    if (form.valid) {
      try {
        await this.authService.login(
          this.formData.email,
          this.formData.password
        );
        console.log('Login successful');
      } catch (err: any) {
        console.error('Login failed:', err.message);
        alert(err.message || 'Login failed. Please check your credentials.');
      }
    } else {
      alert('Please fill in both email and password fields.');
    }
  }

  /**
   * Toggles between sign-in and sign-up mode.
   */
  toggleAsAccount(): void {
    this.signService.toggleAsAccount();
  }
}
