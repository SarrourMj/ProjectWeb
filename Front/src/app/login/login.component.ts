import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule here
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,MatToolbarModule]
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]), // Use email instead of username
    password: new FormControl('', Validators.required),
  });

  constructor(private authService: AuthService, private router: Router) { }
    goToLogin(): void {
      this.router.navigate(['/login']);
    }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value || '';
      const password = this.loginForm.get('password')?.value || '';
  
      this.authService.login({ email, password }).subscribe(
        (response) => {
          console.log('Login successful', response);
  
          // Store token & complete user object in session storage
          this.authService.saveUserData(response.access_token, response.user);
  
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.error('Login failed', error);
          alert('Invalid email or password.');
        }
      );
    }
  }
  
  
}
