import { Component, inject } from '@angular/core';
import { SignInPageService } from '../../sign-in-page.service';

@Component({
  selector: 'app-sign-up-form',
  standalone: true,
  imports: [],
  templateUrl: './sign-up-form.component.html',
  styleUrl: './sign-up-form.component.css',
})
export class SignUpFormComponent {
  // Injecter le service
  signService = inject(SignInPageService);

  // Méthode pour basculer l'état (appel explicite de la méthode du service)
  toggleAsAccount() {
    this.signService.toggleAsAccount(); // Appelle la méthode dans le service
  }
}
