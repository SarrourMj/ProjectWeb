import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthRedirectGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) { 
      // If user is logged in, redirect to dashboard
      this.router.navigate(['/user/courses']); 
      return false;
    }
    return true; // Allow access if not authenticated
  }
}
