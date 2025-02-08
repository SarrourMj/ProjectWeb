import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class EditProfileComponent implements OnInit {
  activeTab: string = 'account';
  passwordForm: FormGroup;
  profileForm: FormGroup;
  loading: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';
  userId: number | null = null;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.passwordForm = this.fb.group({
      currentPassword: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.profileForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['tab']) {
        this.activeTab = params['tab'];
      }
    });

    const user = this.authService.getUser();
    if (user && user.id) {
      this.userId = user.id;
      this.profileForm.patchValue({
        username: user.username,
        email: user.email
      });
    } else {
      console.error('User not found or not logged in');
    }
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
    this.router.navigate([], { queryParams: { tab }, queryParamsHandling: 'merge' });
  }

  changePassword() {
    if (this.passwordForm.valid && this.userId) {
      this.loading = true;
      this.successMessage = '';
      this.errorMessage = '';

      const { currentPassword, newPassword } = this.passwordForm.value;

      this.userService.changePassword(this.userId, currentPassword, newPassword).subscribe({
        next: () => {
          this.successMessage = 'Password updated successfully!';
          this.passwordForm.reset();
        },
        error: (error) => {
          this.errorMessage = error.error.message || 'Error updating password.';
        },
        complete: () => {
          this.loading = false;
        }
      });
    } else {
      this.errorMessage = 'Please fill in all fields correctly.';
    }
  }

  saveProfileChanges() {
    if (this.profileForm.valid && this.userId) {
      this.loading = true;
      this.successMessage = '';
      this.errorMessage = '';

      const { username, email } = this.profileForm.value;

      this.userService.updateProfile(this.userId, { username, email }).subscribe({
        next: (response) => {
          this.successMessage = 'Profile updated successfully!';
         // Save updated user data in session storage
         const updatedUser = response.user;
         this.authService.saveUserData(this.authService.getToken()!, updatedUser);
         
        },
        error: (error) => {
          this.errorMessage = error.error.message || 'Error updating profile.';
        },
        complete: () => {
          this.loading = false;
        }
      });
    } else {
      this.errorMessage = 'Please fill in all fields correctly.';
    }
  }
}
