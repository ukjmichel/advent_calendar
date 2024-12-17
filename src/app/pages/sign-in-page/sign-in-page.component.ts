import { Component, inject } from '@angular/core';
import { LayoutComponent } from '../../core/layout/layout.component';
import { SignInFormComponent } from './forms/sign-in-form/sign-in-form.component';
import { SignUpFormComponent } from './forms/sign-up-form/sign-up-form.component';
import { SignInPageService } from './sign-in-page.service';

@Component({
  selector: 'app-sign-in-page',
  standalone: true,
  imports: [LayoutComponent, SignInFormComponent, SignUpFormComponent],
  templateUrl: './sign-in-page.component.html',
  styleUrl: './sign-in-page.component.css',
})
export class SignInPageComponent {
  signService = inject(SignInPageService);
  asAccount = this.signService.asAccount;
}
