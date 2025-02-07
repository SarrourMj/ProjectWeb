import { Injectable } from '@angular/core';
import { Course } from './../models/course.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {CourseForm} from "../models/courseForm.model";
import { Chapter } from '../models/chapter.model';
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
  getCompletedChapters(userId: number): Observable<Chapter[]> {
    return this.http.get<Chapter[]>(`${this.apiUrl}/user/${userId}/chapters`);
  }
  completeUserChapter(userId: number, chapterId: number): Observable<Chapter> {
    return this.http.post<Chapter>(`${this.apiUrl}/user/${userId}/complete/${chapterId}`, {});
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
    return this.http.post<CourseForm>(`${this.apiUrl}/courses`, courseData);
  }
  incrementUserScore(userId: number, score: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/user/${userId}/increment-score/${score}`, {});
  }
}
