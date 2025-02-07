import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditProfileService {
  private apiUrl = 'http://localhost:3000/user'; // Replace with actual backend URL

  constructor(private http: HttpClient) {}

  changePassword(userId: number, currentPassword: string, newPassword: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${userId}/change-password`, { currentPassword, newPassword });
  }
}
