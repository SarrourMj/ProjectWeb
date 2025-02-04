import { Injectable } from '@angular/core';
import { Course } from './../models/course.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {CourseForm} from "../models/courseForm.model";
@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:3000/courses';

  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl);
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`);
  }

  deleteCourse(id: number): Observable<{ success: boolean }> {
    return this.http.delete<{ success: boolean }>(`${this.apiUrl}/courses/${id}`, {
      withCredentials: true
    });
  }
  
  updateCourse(id: number, courseData: Partial<Course>): Observable<Course> {
    return this.http.patch<Course>(`${this.apiUrl}/courses/${id}`, courseData, {
      withCredentials: true
    });
  }
  createCourse(courseData: Partial<CourseForm>): Observable<CourseForm> {
    return this.http.post<CourseForm>(`${this.apiUrl}/courses`, courseData, {
      withCredentials: true
    });
  }
}
