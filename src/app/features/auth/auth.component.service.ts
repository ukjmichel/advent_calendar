import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthComponentService {
  asAccount = signal<boolean>(true); // Signal initialisé à "false"

  toggleAsAccount() {
    this.asAccount.set(!this.asAccount()); // Inverse la valeur actuelle du signal
  }
}
