import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { Course } from '../../models/course.model';
import { MycoursesService } from '../../services/mycourses.service';
import { AuthService } from 'src/app/services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [ MatTabsModule, NgFor, NgIf, AsyncPipe,RouterModule],
  templateUrl: './mycourses.component.html',
  styleUrls: ['./mycourses.component.scss']
})
export class MycoursesComponent implements OnInit {
  courses: Course[] = [];
  userId: number | null = null; // Store user ID

  constructor(
    private mycoursesService: MycoursesService,
    private authService: AuthService // Inject AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUser(); // Get user from AuthService
    if (user && user.id) {
      this.userId = user.id;
      this.loadCourses(this.userId!);
    } else {
      console.error('User not found or not logged in');
    }
  }

  loadCourses(userId: number): void {
    this.mycoursesService.getEnrolledCourses(userId).subscribe({
      next: (data) => {
        this.courses = data;
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  }
}
