import {Component, OnInit} from '@angular/core';
import {ApiService} from "src/app/services/api.service";
import {ActivatedRoute} from "@angular/router";
import {Course} from "src/app/models/course.model";
import {Subscription} from "rxjs";
import {HttpErrorResponse, HttpEventType, HttpResponse} from "@angular/common/http";
import {MessageService} from "primeng/api";
import {NgForm} from "@angular/forms";
import {Category} from "src/app/models/category.model";
import {CourseService} from "src/app/services/course.service";

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  [x: string]: any;

  // @ts-ignore
  course: Course;
  imgUrl: any = 'https://i0.wp.com/clicxy.com/wp-content/uploads/2016/04/dummy-course-horisontal.jpg?ssl=1';
  imagePath = this.imgUrl;
  altText: string = '';
  filename = '';
  uploadProgress: number = 0;
  showProgress = false;
  uploadSub: Subscription = new Subscription();
  mainImagePath: string = '';
  categories: Category[] = [];

  constructor(private apiService: ApiService,
              private courseService: CourseService,
              private route: ActivatedRoute,
              private messageService: MessageService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      const id =+this.route.snapshot.paramMap.get('id')!
      this.courseService.getCourseById(id).subscribe((data) => {
        this.course = data;
      } )
    })


    this.apiService.getAllCategories().subscribe(cats => this.categories = cats.filter(c => c.title !== 'Uncategorized'));
  }

  
  updateCourse() {
    this.apiService.updateCourse(this.course.id ,this.course).subscribe(res => {
      if (res.title) {
        this.messageService.add({
          severity: 'info',
          summary: 'Successful',
          detail: 'Course updated',
          life: 1500
        })
      }
    }, (err: HttpErrorResponse) => {
      this.messageService.add({
        severity: 'error',
        summary: 'Failure',
        detail: err.statusText,
        life: 1500
      })
    })
  }
}