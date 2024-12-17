import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../services/authentication.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  authService = inject(AuthService);
  isConnected = this.authService.isConnected;
}
