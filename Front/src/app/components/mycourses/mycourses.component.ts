import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { DemoFlexyModule } from 'src/app/demo-LearnSphere';
import { Course } from '../../models/course.model';
import { MycoursesService } from '../../services/mycourses.service';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [DemoFlexyModule, MatTabsModule, NgFor, NgIf, AsyncPipe],
  templateUrl: './mycourses.component.html',
  styleUrls: ['./mycourses.component.scss']
})
export class MycoursesComponent implements OnInit {
  courses: Course[] = [];
  constructor(private mycoursesService: MycoursesService) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.mycoursesService.getEnrolledCourses().subscribe({
      next: (data) => {
        this.courses = data;
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  }

}
