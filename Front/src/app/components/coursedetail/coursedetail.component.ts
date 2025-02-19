import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { MycoursesService } from '../../services/mycourses.service'; // Import the service
import { Course } from '../../models/course.model';
import { Chapter } from '../../models/chapter.model';
import { Question } from '../../models/chapter.model';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CertificatesService } from '../../services/certificate.service';
import { AuthService } from '../../services/auth.service';
import { UserStateService } from '../../services/user-state.service';
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
  userId: number | null = null; // Store user ID
  course: Course | undefined;
  expandedChapters = new Set<number>();
  userAnswers: { [chapterId: number]: { [question: string]: string } } = {};
  feedback: { [chapterId: number]: { [question: string]: string } } = {};
  isEnrolled: boolean = false; // Track enrollment status

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private mycoursesService: MycoursesService, // Inject the service
    private authService: AuthService, // Inject AuthService
    private certificatesService: CertificatesService,
    private userStateService: UserStateService // Inject the service

  ) {}

  ngOnInit(): void {
    const user = this.authService.getUser(); // Get user from AuthService
    if (user && user.id) {
      this.userId = user.id;
    } else {
      console.error('User not found or not logged in');
    }
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.courseService.getCourseById(id).subscribe((data) => {
      this.course = data;
      this.initializeAnswerStorage();
      this.checkEnrollmentStatus();

      // Fetch completed chapters and update isComplete
      this.courseService.getCompletedChapters(user.id).subscribe(
        (completedChapters) => {
          this.updateChapterCompletionStatus(completedChapters);
        },
        (error) => {
          console.error('Error fetching completed chapters:', error);
        }
      );
    });
  }

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
    const chapter = this.course?.chapters.find(chap => chap.id === chapterId);
  
    if (chapter?.completed) {
      console.log('This chapter is already completed. Answers are locked.');
      return; // Exit early if the chapter is completed
    }
  
    const userAnswer = this.userAnswers[chapterId][question.question].trim().toLowerCase();
    const correctAnswer = question.answer.trim().toLowerCase();
  
    if (userAnswer === correctAnswer) {
      this.feedback[chapterId][question.question] = '✅ Correct!';
  
      this.courseService.completeUserChapter(this.userId!, chapterId).subscribe(() => {
        console.log('User completed this chapter successfully');
        this.updateChapterCompletionStatus([{ id: chapterId } as Chapter]);
  
        if (chapter) {
          this.courseService.incrementUserScore(this.userId!, chapter.score).subscribe({
            next: (updatedUser) => {
              console.log('New score:', updatedUser);
              this.userStateService.updateScore(updatedUser.score!);
            },
            error: (err) => console.error('Error:', err)
          });
        }
  
        if (this.areAllChaptersCompleted()) {
          this.assignCertificateToUser();
        }
  
      }, error => console.error('Error completing chapter:', error));
    } else {
      this.feedback[chapterId][question.question] = '❌ Incorrect. Try again.';
    }
  }
  
  private areAllChaptersCompleted(): boolean {
    return this.course?.chapters.every(chapter => chapter.completed) ?? false;
  }
  
  private assignCertificateToUser(): void {
    if (this.course) {
      this.certificatesService.assignCertificate(this.userId!, this.course.id).subscribe(
        () => console.log('Certificate assigned successfully'),
        error => console.error('Error assigning certificate:', error)
      );
    }
  }
  

  updateChapterCompletionStatus(completedChapters: Chapter[]): void {
    if (this.course) {
      completedChapters.forEach(completedChapter => {
        const chapter = this.course!.chapters.find(chap => chap.id === completedChapter.id);
        if (chapter) {
          chapter.completed = true; // Add a `completed` property to your Chapter model
        }
      });
    }
  }

  enrollInCourse(): void {
    if (this.course) {
      this.courseService.enrollUserCourse(this.userId!, this.course.id).subscribe(() => {
        console.log('User enrolled in course successfully');
        this.isEnrolled = true; // Update enrollment status
      }, (error) => {
        console.error('Error enrolling user in course:', error);
      });
    }
  }

  checkEnrollmentStatus(): void {
    const userId = this.userId!; // Replace with the actual user ID
    if (this.course) {
      this.mycoursesService.getEnrolledCourses(userId).subscribe((courses) => {
        // Check if the current course is in the list of enrolled courses
        this.isEnrolled = courses.some((course) => course.id === this.course!.id);
      }, (error) => {
        console.error('Error fetching enrolled courses:', error);
      });
    }
  }
  }
