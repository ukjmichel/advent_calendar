import { Component, inject } from '@angular/core';
import { SignInPageService } from '../../sign-in-page.service';

@Component({
  selector: 'app-sign-in-form',
  standalone: true,
  imports: [],
  templateUrl: './sign-in-form.component.html',
  styleUrl: './sign-in-form.component.css',
})
export class SignInFormComponent {
  signService = inject(SignInPageService);
  toggleAsAccount() {
    this.signService.toggleAsAccount();
  }
}
