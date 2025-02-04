import { Injectable } from '@angular/core';
import { Course } from './../models/course.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/courses`);
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/courses/${id}`);
  }
  enrollUserCourse(userId: number, courseId: number): Observable<Course> {
    return this.http.post<Course>(`${this.apiUrl}/user/${userId}/enroll/${courseId}`, {});
  }
}
