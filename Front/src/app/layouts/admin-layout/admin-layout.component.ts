import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
interface sidebarMenu {
  link: string;
  icon: string;
  menu: string;
  children?: sidebarMenu[]; // Optional children property
}

@Component({
  selector: 'app-full',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent {

  search: boolean = false;
  admin: any = null;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, 
    private authService: AuthService,
    private router: Router // Inject Router for navigation
  ) { }
  ngOnInit(): void {
    this.admin = this.authService.getUser();
  }

  logout(): void {
    this.authService.logout(); // Clear session
    this.router.navigate(['/login']); // Redirect to login
  }
  routerActive: string = "activelink";

  sidebarMenu: sidebarMenu[] = [
  

    {
      link: "/admin/coursemanagement",
      icon: "star",
      menu: "All Courses",
    },
    
    {
      link: "/admin/coursemanagement", // Main link (optional)
      icon: "list", // Icon for the main button
      menu: "Course Management", // Main button text
      children: [ // Dropdown options
        { link: "/admin/coursemanagement/Create", icon: "plus", menu: "Create New Course" },
        { link: "/admin/coursemanagement/Category", icon: "folder", menu: "Categories" }
      ]
    },
    
  
  ];
  openDropdown: any = null; 

  toggleDropdown(menuItem: any) {
    if (this.openDropdown === menuItem) {
      this.openDropdown = null; 
    } else {
      this.openDropdown = menuItem; 
    }
  }

  isDropdownOpen(menuItem: any) {
    return this.openDropdown === menuItem;
  }

}
