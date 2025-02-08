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
  selectedCategoryID: number=1;
  categories: Category[] = [];
  mainImageFile : File | null=null;
  certificateImageFile : File | null=null;

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
    console.log('Selected Category ID:', this.selectedCategoryID); // Debugging
    console.log('Main Image Path:', this.mainImageFile); // Debugging
    console.log('Certificate Image Path:', this.certificateImageFile); // Debugging
    console.log('Chapters:', this.chapters); // Debugging
  
    /*if (
      form.invalid ||
      !this.selectedCategoryId ||
      !this.mainImageFile ||
      !this.certificateImageFile ||
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
      category: { id: this.selectedCategoryID, title: this.categories.find(c => c.id === this.selectedCategoryID)?.title || '' } ,
      mainimageurl:'./assets/uploads/course/' + this.mainImageFile!.name,
      certificateImageUrl:'./assets/uploads/certificates/' + this.certificateImageFile!.name,
      chapters: this.chapters.map(chapter => ({
        title: chapter.title,
        content: chapter.content,
        questions: chapter.questions.map(question => ({
          question: question.question,
          answer: question.answer
        })),
        score: chapter.score
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
    this.selectedCategoryID =1;
    this.mainImageFile = null;
    this.certificateImageFile = null;
  }

  onFileSelected(event: any, type: 'mainImage' | 'certificateImage'): void {
    const file: File = event.currentFiles[0];
    if (type === 'mainImage') {this.mainImageFile = file;}
    else if (type === 'certificateImage') {this.certificateImageFile = file;}
    console.log(file);
    console.log("type",type);
    if (file) {
      this.apiService.uploadFile(file, type).subscribe(
        response => console.log('Upload successful:', response),
        error => console.error('Upload failed:', error)
      );
    }
  }
   

}