import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from "src/app/services/api.service";
import { CourseService } from "src/app/services/course.service";
import { Course } from "src/app/models/course.model";
import { Table } from "primeng/table";
import { MessageService } from "primeng/api";

@Component({
  selector: 'app-admincourse',
  templateUrl: './Admincourse.component.html',
  styleUrls: ['./Admincourse.component.scss']
})
export class AdminCourseComponent implements OnInit {
  // @ts-ignore
  @ViewChild('dt1', { static: false }) dt1: Table;
  // @ts-ignore
  @ViewChild('search') search: HTMLInputElement;

  loading: boolean = true;
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  searchQuery: string = '';

  constructor(private courseService: CourseService, private message: MessageService) {}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe({
      next: (data) => {
        this.courses = data;
        this.filteredCourses = data; 
        console.log('Courses loaded in component:', this.courses);
      },
      error: (error) => {
        console.error('Error loading courses in component:', error);
      }
    });
  }
  filterCourses(): void {
    this.filteredCourses = this.courses.filter(course =>
      course.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      course.content.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
  /*

  constructor(private apiService: ApiService,
              private message: MessageService) {}

  ngOnInit(): void {
    this.apiService.getAllCourses().toPromise().then(admincourse => {
      this.admincourse = admincourse;
      this.loading = false;
    });
  }

  clear(table: Table) {
    table.clear();
  }

  filterText(ev: any) {
    this.dt1.filterGlobal(ev.target.value, 'contains');
  }
*/
clear(table: Table) {
  table.clear();
}
  removeCourse(id: number) {
    this.courseService.deleteCourse(id).subscribe(res => {
      if (res.success) {
        this.courses = this.courses.filter(p => p.id !== id);
        this.message.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Course removed',
          life: 1500
        });
      }
    });
  }
}