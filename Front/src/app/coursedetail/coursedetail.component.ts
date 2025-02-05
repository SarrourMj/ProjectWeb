import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../services/course.service';
import { MycoursesService } from '../services/mycourses.service'; // Import the service
import { Course } from '../models/course.model';
import { Chapter } from '../models/chapter.model';
import { Question } from '../models/chapter.model';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-course-detail',
  templateUrl: './coursedetail.component.html',
  styleUrls: ['./coursedetail.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('expanded', style({
        height: '*',
        opacity: 1
      })),
      state('collapsed', style({
        height: '0',
        opacity: 0
      })),
      transition('expanded <=> collapsed', [
        animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ])
    ])
  ]
})
export class CourseDetailComponent implements OnInit {
  course: Course | undefined;
  expandedChapters = new Set<number>();
  userAnswers: { [chapterId: number]: { [question: string]: string } } = {};
  feedback: { [chapterId: number]: { [question: string]: string } } = {};
  isEnrolled: boolean = false; // Track enrollment status

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private mycoursesService: MycoursesService // Inject the service
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.courseService.getCourseById(id).subscribe((data) => {
      this.course = data;
      this.initializeAnswerStorage();
      this.checkEnrollmentStatus(); // Check if the user is enrolled
    });
  }

  // In your component.ts
toggleChapter(chapter: Chapter): void {
  if (this.expandedChapters.has(chapter.id)) {
    this.expandedChapters.delete(chapter.id);
  } else {
    this.expandedChapters.add(chapter.id);
    // Optional: Scroll to chapter if needed
    setTimeout(() => {
      const element = document.getElementById(`chapter-${chapter.id}`);
      element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
  }
}

  initializeAnswerStorage(): void {
    if (this.course) {
      this.course.chapters.forEach((chapter) => {
        this.userAnswers[chapter.id] = {};
        this.feedback[chapter.id] = {};
        chapter.questions?.forEach((question) => {
          this.userAnswers[chapter.id][question.question] = '';
          this.feedback[chapter.id][question.question] = '';
        });
      });
    }
  }

  validateAnswer(chapterId: number, question: Question): void {
    const userAnswer = this.userAnswers[chapterId][question.question].trim().toLowerCase();
    const correctAnswer = question.answer.trim().toLowerCase();

    this.feedback[chapterId][question.question] =
      userAnswer === correctAnswer ? '✅ Correct!' : '❌ Incorrect. Try again.';
  }

  enrollInCourse(): void {
    const userId = 1; // Replace with the actual user ID
    if (this.course) {
      this.courseService.enrollUserCourse(userId, this.course.id).subscribe(() => {
        console.log('User enrolled in course successfully');
        this.isEnrolled = true; // Update enrollment status
      }, (error) => {
        console.error('Error enrolling user in course:', error);
      });
    }
  }

  checkEnrollmentStatus(): void {
    const userId = 1; // Replace with the actual user ID
    if (this.course) {
      this.mycoursesService.getEnrolledCourses().subscribe((courses) => {
        // Check if the current course is in the list of enrolled courses
        this.isEnrolled = courses.some((course) => course.id === this.course!.id);
      }, (error) => {
        console.error('Error fetching enrolled courses:', error);
      });
    }
  }
}