import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class MycoursesService {
  private apiUrl = 'http://localhost:3000/courses'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  getEnrolledCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/enrolled`);
  }
}