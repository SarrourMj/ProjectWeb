import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { EditProfileService } from 'src/app/services/edit-profile.service';
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
  loading: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';
  userId: number | null = null; // Store user ID

  constructor(
    private editProfileService: EditProfileService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService // Inject AuthService

  ) {
    this.passwordForm = this.fb.group({
      currentPassword: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['tab']) {
        this.activeTab = params['tab'];
      }
    });
    const user = this.authService.getUser(); // Get user from AuthService
    if (user && user.id) {
      this.userId = user.id;
    } else {
      console.error('User not found or not logged in');
    }
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
    this.router.navigate([], { queryParams: { tab }, queryParamsHandling: 'merge' });
  }

  changePassword() {
    if (this.passwordForm.valid) {
      this.loading = true;
      this.successMessage = '';
      this.errorMessage = '';

      const { currentPassword, newPassword } = this.passwordForm.value;

      console.log('currentPassword', currentPassword);
      console.log('newPassword', newPassword);
      console.log('userId', this.userId);
      
      
      

      this.editProfileService.changePassword(this.userId!,currentPassword, newPassword).subscribe({
        next: () => {
          this.successMessage = 'Password updated successfully!';
          this.passwordForm.reset();
        },
        error: (error) => {
          this.errorMessage = error.error.message || 'Error updating password.';
          this.passwordForm.reset();
          this.loading = false;
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
