import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';
import { ApiService } from '../../services/api.service';
import { Category } from '../../models/category.model';
@Component({
  selector: 'app-home',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  searchQuery: string = '';
  categories: Category[] = [];
  selectedCategory: string = '';
  constructor(private courseService: CourseService,
              private CategoryService: ApiService
  ) {}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe({
      next: (data) => {
        this.courses = data;
        this.filteredCourses = data; // Initialize filteredCourses with all courses
        console.log('Courses loaded in component:', this.courses);
      },
      error: (error) => {
        console.error('Error loading courses in component:', error);
      }
    });
    this.CategoryService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
        console.log('Categories loaded in component:', this.categories);
      },
      error: (error) => {
        console.error('Error loading categories in component:', error);
      }
    });
  }
  filterCourses(): void {
    console.log('Selected Category:', this.selectedCategory); // Debugging
    console.log('All Courses:', this.courses); // Debugging
  
    this.filteredCourses = this.courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                            course.content.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesCategory = this.selectedCategory === '' || course.category?.title === this.selectedCategory;
  
      console.log('Course:', course.title, 'Matches Search:', matchesSearch, 'Matches Category:', matchesCategory); // Debugging
  
      return matchesSearch && matchesCategory;
    });
  
    console.log('Filtered Courses:', this.filteredCourses); // Debugging
  }
 
}