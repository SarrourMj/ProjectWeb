import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { User } from 'angular-feather/icons';
interface sidebarMenu {
  link: string;
  icon: string;
  menu: string;
}

@Component({
  selector: 'app-full',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss']
})
export class UserLayoutComponent {
  userXP: number = 0;
  search: boolean = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) { }

  routerActive: string = "activelink";

  sidebarMenu: sidebarMenu[] = [

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
  
  ]

}
