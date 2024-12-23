import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../../../services/authentication.service';
import { SignInPageService } from '../../sign-in-service.service';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css'],
  standalone: true,
  imports: [FormsModule],
})
export class SignUpFormComponent {
  formData = {
    username: '',
    email: '',
    password: '',
  };

  signService = inject(SignInPageService);
  errorMessage: string | null = null; // Property to store error messages

  private authService = inject(AuthenticationService);

  /**
   * Handles form submission using async/await.
   * Calls the register method in AuthenticationService and shows appropriate feedback.
   */
  async onSubmit(form: any): Promise<void> {
    if (form.valid) {
      this.errorMessage = null; // Reset error message before submission
      try {
        await this.authService.register(
          this.formData.username,
          this.formData.email,
          this.formData.password
        );
        console.log('Registration successful');
        form.reset(); // Reset the form after successful submission
      } catch (err: any) {
        console.error('Registration failed:', err);
        this.errorMessage =
          err.message || 'Registration failed. Please try again.'; // Set error message
      }
    } else {
      this.errorMessage = 'Please fill in all required fields correctly.';
    }
  }

  /**
   * Toggles between sign-in and sign-up mode.
   */
  toggleAsAccount(): void {
    this.signService.toggleAsAccount(); // Call the method in the service
    console.log(this.signService.asAccount());
  }
}
