import { Component, inject } from '@angular/core';
import { SignInPageService } from '../../sign-in-page.service';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../services/authentication.service';

@Component({
  selector: 'app-sign-in-form',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sign-in-form.component.html',
  styleUrl: './sign-in-form.component.css',
})
export class SignInFormComponent {
  signService = inject(SignInPageService);
  authService = inject(AuthService);
  onClick() {
    this.authService.login();
  }
  toggleAsAccount() {
    this.signService.toggleAsAccount();
  }
}
