import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Course } from "src/app/models/course.model";
import { Category } from "src/app/models/category.model";
import { Chapter } from "src/app/models/chapter.model";
import {ChapterForm} from "src/app/models/chapterForm.model";
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private URL = 'http://localhost:3000'; // Update with your NestJS API URL

  constructor(private http: HttpClient) {}

  // COURSE METHODS
  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.URL}/courses`);
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.URL}/courses/id/${id}`);
  }

  createCourse(courseData: Partial<Course>): Observable<Course> {
    return this.http.post<Course>(`${this.URL}/courses`, courseData);
  }

  updateCourse(id: number, courseData: Partial<Course>): Observable<Course> {
    return this.http.patch<Course>(`${this.URL}/courses/${id}`, courseData);
  }

  deleteCourse(id: number): Observable<{ success: boolean }> {
    return this.http.delete<{ success: boolean }>(`${this.URL}/courses/${id}`);
  }

  // CATEGORY METHODS
  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.URL}/categories`);
  }

  createCategory(categoryData: Partial<Category>): Observable<Category> {
    return this.http.post<Category>(`${this.URL}/categories`, categoryData);
  }
  uploadFile(file: File): Observable<any> {

    return this.http.post('http://localhost:3000/upload-file', File);
  

  }

  updateCategory(id: number, categoryData: Partial<Category>): Observable<Category> {
    return this.http.patch<Category>(`${this.URL}/categories/${id}`, categoryData);
  }

  deleteCategory(id: number): Observable<{ success: boolean }> {
    return this.http.delete<{ success: boolean }>(`${this.URL}/categories/${id}`);
  }

  // CHAPTER METHODS
  getChaptersByCourse(courseId: number): Observable<Chapter[]> {
    return this.http.get<Chapter[]>(`${this.URL}/courses/${courseId}/chapters`);
  }

  createChapter(courseId: number, chapterData: Partial<ChapterForm>): Observable<ChapterForm> {
    return this.http.post<ChapterForm>(`${this.URL}/courses/${courseId}/chapters`, chapterData);
  }

  updateChapter(chapterId: number, chapterData: Partial<ChapterForm>): Observable<ChapterForm> {
    return this.http.patch<ChapterForm>(`${this.URL}/chapters/${chapterId}`, chapterData);
  }

  deleteChapter(chapterId: number): Observable<{ success: boolean }> {
    return this.http.delete<{ success: boolean }>(`${this.URL}/chapters/${chapterId}`);
  }
}