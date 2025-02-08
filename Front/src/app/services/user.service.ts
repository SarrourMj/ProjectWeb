import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getUserScore(userId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/user/${userId}/score`);
  }

  getCompletedCourses(userId: number): Observable<number[]> {
    return this.http.get<number[]>(`${this.apiUrl}/user/completed-courses/${userId}`);
  }

  changePassword(userId: number, currentPassword: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/${userId}/change-password`, { currentPassword, newPassword });
  }

  updateProfile(userId: number, data: { username: string; email: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/user/${userId}`, data);
  }
}
