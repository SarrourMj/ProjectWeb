import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
interface SidebarMenu {
  link: string;
  icon: string;
  menu: string;
}

@Component({
  selector: 'app-full',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss'],

})
export class UserLayoutComponent {
  userScore: number = 0;
  search: boolean = false;
  user: any = null; // Store user data here

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService, // Inject AuthService here
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
    if (this.user?.id) {
      // Fetch only the score
      this.userService.getUserScore(this.user.id).subscribe(
        (score) => {
          this.userScore = score;
          console.log('Fetched score:', this.userScore);
        },
        (error) => {
          console.error('Error fetching score:', error);
          // Fallback to stored score if API fails
          this.userScore = this.user?.score || 0;
        }
      );
    }
  }

  routerActive: string = "activelink";

  sidebarMenu: SidebarMenu[] = [
    {
      link: "/user/courses",
      icon: "home",
      menu: "Courses",
    },
    {
      link: "/user/mycourses",
      icon: "list",
      menu: "My courses",
    },
    {
      link: "/user/mycertificates",
      icon: "star",
      menu: "My badges",
    },
    {
      link: "/user/tooltip",
      icon: "bell",
      menu: "Notifications",
    },
  ];
}
