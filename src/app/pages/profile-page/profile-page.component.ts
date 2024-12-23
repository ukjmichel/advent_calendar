import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { FormsModule } from '@angular/forms';
import { LayoutComponent } from '../../core/layout/layout.component';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
  imports: [FormsModule, LayoutComponent],
  standalone: true,
})
export class ProfilePageComponent implements OnInit {
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

  constructor(private authService: AuthenticationService) {}

  async ngOnInit(): Promise<void> {
    try {
      const profile: any = await this.authService.getProfile(); // Fetch user profile
      console.log(profile);
      this.id = profile.user.id;
      this.username = profile.user.username;
      this.email = profile.user.email;
    } catch (error: any) {
      console.error('Failed to load profile:', error);
      this.errorMessage = error.message || 'Failed to load profile.';
    }
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
