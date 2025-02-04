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
  chapters: ChapterForm[] = [this.createNewChapter()];
  selectedCategoryId?: number;
  categories: Category[] = [];
  mainImagePath = '';

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

  onFileSelected(event: any): void {
    const file: File = event.files[0];
    if (file) {
      this.apiService.uploadImage(file).subscribe({
        next: (response: any) => {
          this.mainImagePath = response.path;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Image uploaded successfully'
          });
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

  createCourse(form: NgForm): void {
    if (form.invalid || !this.selectedCategoryId) return;

    const courseData = {
      ...this.course,
      categoriesId: this.selectedCategoryId,
      mainImageUrl: this.mainImagePath,
      chapters: this.chapters.map(chapter => ({
        ...chapter,
        questions: chapter.questions,
        score: chapter.score || undefined
      }))
    };

    this.CourseService.createCourse(courseData).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Course created successfully'
        });
        this.resetForm(form);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Course creation failed'
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
}