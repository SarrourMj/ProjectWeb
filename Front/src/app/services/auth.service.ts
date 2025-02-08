import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth'; // Backend auth endpoint

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  saveUserData(token: string, user: any): void {
    sessionStorage.setItem('access_token', token);
    sessionStorage.setItem('user', JSON.stringify(user)); // Store entire user object
    console.log('Updated User:', user);

  }

  getToken(): string | null {
    return sessionStorage.getItem('access_token');
  }

  getUser(): any {
    const user = sessionStorage.getItem('user');
    return user ? JSON.parse(user) : null; // Retrieve and parse the user object
  }

  isAuthenticated(): boolean {
    return !!this.getToken(); // Check if token exists
  }

  logout(): void {
    sessionStorage.clear(); // Clears all stored data
  }

}
