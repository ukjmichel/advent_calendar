import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { AuthComponentService } from '../../auth.component.service';
import { ScreenSizeService } from '../../../../services/screen-size.service';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css'],
  imports: [FormsModule],
})
export class SignUpFormComponent {
  formData = {
    username: '',
    email: '',
    password: '',
  };

  authPageService = inject(AuthComponentService);
  isSmallScreen = inject(ScreenSizeService).isSmallScreen;

  private authService = inject(AuthService);

  /**
   * Handles form submission using async/await.
   * Calls the register method in AuthenticationService and shows appropriate feedback.
   */
  async onSubmit(form: any): Promise<void> {
    if (form.valid) {
      try {
        this.authService.register(
          this.formData.email,
          this.formData.username,
          this.formData.password
        );
      } catch (err: any) {
        console.error('Registration failed:', err);
        alert(err.message || 'Signup failed');
      }
    } else {
      alert('Please fill all fields.');
    }
  }

  /**
   * Toggles between sign-in and sign-up mode.
   */
  toggleAsAccount(): void {
    this.authPageService.toggleAsAccount(); // Call the method in the service
    console.log(this.authPageService.asAccount());
  }
}
