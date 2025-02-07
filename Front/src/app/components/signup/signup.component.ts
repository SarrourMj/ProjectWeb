import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignupService } from '../../services/signup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  signupForm: FormGroup;
  successMessage: string = '';
  showMessage: boolean = false;
  showForm: boolean = true;
goToLogin(): void {
  this.router.navigate(['/login']);
}
  constructor(private fb: FormBuilder, private signupService: SignupService, private router: Router) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.signupService.signup(this.signupForm.value).subscribe({
        next: (response) => {
          console.log('Signup successful', response);
          this.successMessage = 'Successfully signed up! Redirecting...';
          this.showMessage = true;
          this.showForm = false;  // Hide the form

          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);  // Redirect after 3 seconds
        },
        error: (err) => {
          console.error('Signup error', err);
          this.successMessage = 'Signup failed, please try again.';
          this.showMessage = true;
          this.showForm = false;  // Optionally hide form on error too

          setTimeout(() => {
            this.showForm = true;  // Show form again to allow retry
            this.showMessage = false;  // Hide message after 3 seconds
          }, 3000);
        },
      });
    }
  }
}