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
    return of([
      {
        "id": 1,
        "title": "Introduction to Python",
        "certificate": "Python Basics",
        "background_image": "https://example.com/python-bg.jpg",
        "content": "Learn Python fundamentals.",
        "slug": "intro-python",
        "createdOn": "2025-02-04T17:19:33.348Z",
        "modifiedOn": "2025-02-04T17:19:33.348Z",
        "mainImageUrl": "https://example.com/python-main.jpg",
        "category": {
          "id": 1,
          "title": "Programming"
        },
        "chapters":[]
      },
      {
        "id": 2,
        "title": "Web Development 101",
        "certificate": "Web Dev Certificate",
        "background_image": "https://example.com/webdev-bg.jpg",
        "content": "HTML, CSS, JS basics.",
        "slug": "web-dev-101",
        "createdOn": "2025-02-04T17:19:33.348Z",
        "modifiedOn": "2025-02-04T17:19:33.348Z",
        "mainImageUrl": "https://example.com/webdev-main.jpg",
        "category": {
          "id": 2,
          "title": "Web Development"
        },
        "chapters":[]
      }
    ]);
    // return this.http.get<Course[]>(`${this.apiUrl}/user/1/courses`);
  }
}