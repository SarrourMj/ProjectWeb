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
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss']
})
export class FullComponent {

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
      link: "/home",
      icon: "home",
      menu: "home",
    },
    
    {
      link: "/mycourses",
      icon: "list",
      menu: "My courses",
    },
    
    {
      link: "/toolbar",
      icon: "star",
      menu: "My badges",
    },
  
    {
      link: "/tooltip",
      icon: "bell",
      menu: "Notifications",
    },
  
  ]

}
