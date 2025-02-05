import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    console.log('🔍 Checking UserGuard...');
    const user = this.authService.getUser();
    console.log('User Data:', user);

    if (user && user.role === 'normal user') {
      console.log('✅ UserGuard Passed - User is a normal user');
      return true;
    }

    console.log('❌ UserGuard Failed - Redirecting to /home');
    this.router.navigate(['/home']);
    return false;
  }
}
