import { Component, inject, OnDestroy, Signal, signal } from '@angular/core';
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
export class SignInPageComponent implements OnDestroy {
  signService = inject(SignInPageService);
  asAccount = this.signService.asAccount;

  screenWidth = signal<number>(window.innerWidth);

  constructor() {
    // Add a listener for window resize events
    window.addEventListener('resize', this.updateScreenWidth);
  }

  private updateScreenWidth = (): void => {
    // Update the signal value when the window resizes
    this.screenWidth.set(window.innerWidth);
  };

  // Clean up event listener
  ngOnDestroy(): void {
    window.removeEventListener('resize', this.updateScreenWidth);
  }
}
