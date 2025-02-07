import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { LayoutComponent } from '../../core/layout/layout.component';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-profile-page',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  imports: [FormsModule, LayoutComponent],
})
export class ProfilePageComponent implements OnInit {
  authService = inject(AuthService);

  formData = {
    id: '',
    username: '',
    email: '',
    password: '',
  };
  id: string = '';
  username: string = '';
  email: string = '';
  isEditing = false; // Track edit mode
  errorMessage: string | null = null; // Store error messages

  async ngOnInit(): Promise<void> {
    this.id = this.authService.user().id;
    this.username = this.authService.user().username;
    this.email = this.authService.user().email;
  }

  enableEdit(): void {
    this.isEditing = true; // Enable edit mode
  }

  async onSubmit(form: any): Promise<void> {
    // if (form.valid) {
    //   this.errorMessage = null; // Reset error message
    //   try {
    //     await this.authService.updateProfile(
    //       this.formData.id,
    //       this.formData.username,
    //       this.formData.email,
    //       this.formData.password
    //     );
    //     console.log('Profile updated successfully');
    //     alert('Profile updated successfully!');
    //     this.isEditing = false; // Exit edit mode
    //   } catch (error: any) {
    //     console.error('Profile update failed:', error);
    //     this.errorMessage =
    //       error.message || 'Profile update failed. Please try again.';
    //   }
    // } else {
    //   this.errorMessage = 'Please fill in all required fields.';
    // }
  }
}
