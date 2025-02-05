// new-course.component.ts
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ApiService } from 'src/app/services/api.service';
import { CourseService } from 'src/app/services/course.service';
import { Category } from 'src/app/models/category.model';

import { ChapterForm, QuestionForm } from './../../../models/chapterForm.model';

@Component({
  selector: 'app-new-course',
  templateUrl: './New.component.html',
  styleUrls: ['./New.component.scss']
})
export class NewComponent implements OnInit {
  course = { title: '', content: '' };
  submitted = false;
  chapters: ChapterForm[] = [this.createNewChapter()];
  selectedCategoryId?: number;
  categories: Category[] = [];
  mainImagePath = '';
  certificateImagePath = '';

  constructor(
    private apiService: ApiService,
    private CourseService: CourseService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  private loadCategories(): void {
    this.apiService.getAllCategories().subscribe(cats => {
      this.categories = cats.filter(c => c.title !== 'Uncategorized');
    });
  }

  createNewChapter(): ChapterForm {
    return { title: '', content: '', questions: [], score: undefined };
  }

  createNewQuestion(): QuestionForm {
    return { question: '', answer: '' };
  }

  addChapter(): void {
    this.chapters.push(this.createNewChapter());
  }

  removeChapter(index: number): void {
    if (this.chapters.length > 1) {
      this.chapters.splice(index, 1);
    }
  }

  addQuestion(chapter: ChapterForm): void {
    chapter.questions.push(this.createNewQuestion());
  }

  removeQuestion(chapter: ChapterForm, index: number): void {
    chapter.questions.splice(index, 1);
  }


  createCourse(form: NgForm): void {
    this.submitted = true;
  
    console.log('Form Valid:', form.valid); // Debugging
    console.log('Selected Category ID:', this.selectedCategoryId); // Debugging
    console.log('Main Image Path:', this.mainImagePath); // Debugging
    console.log('Certificate Image Path:', this.certificateImagePath); // Debugging
    console.log('Chapters:', this.chapters); // Debugging
  
    /*if (
      form.invalid ||
      !this.selectedCategoryId ||
      !this.mainImagePath ||
      !this.certificateImagePath ||
      this.chapters.length === 0 ||
      this.chapters.some(chapter => !chapter.title || !chapter.content || chapter.questions.length === 0 || !chapter.score)
    ) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fill all required fields.'
      });
      return;
    }*/
  
    const courseData = {
      ...this.course,
      categoryid: this.selectedCategoryId,
      mainImageUrl: this.mainImagePath,
      certificateImageUrl: this.certificateImagePath, // Add this line
      chapters: this.chapters.map(chapter => ({
        ...chapter,
        questions: chapter.questions,
        score: chapter.score || undefined
      }))
    };
  
    console.log('Course Data:', courseData); // Debugging
  
    this.CourseService.createCourse(courseData).subscribe({
      next: (response) => {
        console.log('Course created successfully:', response); // Debugging
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Course created successfully'
        });
        this.resetForm(form);
      },
      error: (error) => {
        console.error('Error creating course:', error); // Debugging
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to create course. Please try again.'
        });
      }
    });
  }

  private resetForm(form: NgForm): void {
    form.resetForm();
    this.chapters = [this.createNewChapter()];
    this.selectedCategoryId = undefined;
    this.mainImagePath = '';
  }

  onFileSelected(event: any, type: 'mainImage' | 'certificateImage'): void {
    const file: File = event.files[0];
    console.log('event:', event); // Debugging
    console.log('File selected:', file); // Debugging
    if (file) {
      this.apiService.uploadImage(file).subscribe({
        next: (response: any) => {
          if (response && response.path) {
            if (type === 'mainImage') {
              console.log('Main Image uploaded:', response); // Debugging
              this.mainImagePath = response.path;
            } else {
              this.certificateImagePath = response.path;
            }
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Image uploaded successfully'
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Image upload failed: Invalid response'
            });
          }
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Image upload failed'
          });
        }
      });
    }
  }
}