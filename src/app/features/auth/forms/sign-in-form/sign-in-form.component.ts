import { Component, effect, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthComponentService } from '../../auth.component.service';
import { ScreenSizeService } from '../../../../services/screen-size.service';
import { Store } from '@ngrx/store';

import { AuthService } from '../../../../core/services/auth.service';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  selectLoading,
  selectError,
} from '../../../../store/auth/auth.selectors';
import { login } from '../../../../store/auth/auth.actions';

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
  private store = inject(Store);
  private authService = inject(AuthService);

  // Use toSignal to get NgRx state updates
  loading = toSignal(this.store.select(selectLoading));
  error = toSignal(this.store.select(selectError));

  /**
   * Handles form submission using NgRx login action.
   */
  onSubmit(form: NgForm): void {
    if (!form.valid) {
      alert('Please fill in both email and password fields.');
      return;
    }

    this.authService.login( this.formData.email, this.formData.password )
    ;
  }

  /**
   * Toggles between sign-in and sign-up mode.
   */
  toggleAsAccount(): void {
    this.authPageService.toggleAsAccount();
  }
}
