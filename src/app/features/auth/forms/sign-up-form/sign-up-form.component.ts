import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { AuthComponentService } from '../../auth.component.service';
import { ScreenSizeService } from '../../../../core/services/screen-size.service';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  selectError,
  selectLoading,
} from '../../../../store/auth/auth.selectors';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css'],
  imports: [FormsModule],
})
export class SignUpFormComponent {
  authPageService = inject(AuthComponentService);
  isSmallScreen = inject(ScreenSizeService).isSmallScreen;
  private authService = inject(AuthService);
  private store = inject(Store);

  // Use toSignal to get NgRx state updates
  loading = toSignal(this.store.select(selectLoading));
  error = toSignal(this.store.select(selectError));

  formData = {
    username: '',
    email: '',
    password: '',
  };

  submitted = false;

  onSubmit(form: NgForm): void {
    this.submitted = true;

    // Submit only if form is valid
    if (form.valid) {
      try {
        this.authService.register(
          this.formData.email,
          this.formData.username,
          this.formData.password
        );
        form.resetForm(); // Reset form after successful submission
      } catch (error) {
        console.error(error);
      }
    }
  }

  /**
   * Toggles between sign-in and sign-up mode.
   */
  toggleAsAccount(): void {
    this.authPageService.toggleAsAccount();
    console.log(this.authPageService.asAccount());
  }

  resetIsSubmited(): void {
    this.submitted = false;
    this.authService.clearError();
  }
}
