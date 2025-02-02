import { Injectable } from '@angular/core';
import { Course } from './../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  getCourses(): Course[] {
    return [
      { id: 1, title: 'Angular Basics', description: 'Learn the basics of Angular.', imageUrl: '../../../assets/images/channels4_profile.jpg' },
      { id: 2, title: 'Advanced Angular', description: 'Dive deeper into Angular concepts.', imageUrl: '../../../assets/images/Peak.png' },
      // Add more courses as needed
    ];
  }
}