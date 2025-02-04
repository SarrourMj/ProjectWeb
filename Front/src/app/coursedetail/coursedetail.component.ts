import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../services/course.service';
import { Course } from '../models/course.model';

@Component({
  selector: 'app-course-detail',
  template: `
    <div *ngIf="course">
      <h2>{{ course.title }}</h2>
      <p>{{ course.content }}</p>
      <h3>Chapters</h3>
    </div>
  `,
})
export class CourseDetailComponent implements OnInit {
  course: Course | undefined;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!; // Get course ID from route
    this.courseService.getCourseById(id).subscribe((data) => {
      this.course = data;
    });
  }
}