import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class MycoursesService {
  private apiUrl = 'http://localhost:3000'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  getEnrolledCourses(): Observable<Course[]> {
    
    return this.http.get<Course[]>(`${this.apiUrl}/user/1/courses`);
  }
}