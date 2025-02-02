import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

interface sidebarMenu {
  link: string;
  icon: string;
  menu: string;
}

@Component({
  selector: 'app-full',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent {

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
      link: "/admin/dashboard",
      icon: "home",
      menu: "Dashboard",
    },
    
    {
      link: "/admin/coursemanagement",
      icon: "list",
      menu: "Course management",
    },
    
    {
      link: "/admin/usermanagement",
      icon: "star",
      menu: "User management",
    },
  
    {
      link: "/admin/tooltip",
      icon: "bell",
      menu: "Notifications",
    },
  
  ]

}
