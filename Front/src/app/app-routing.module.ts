import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MycoursesComponent } from './components/mycourses/mycourses.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { TooltipsComponent } from './components/tooltips/tooltips.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { CoursesComponent } from './components/courses/courses.component'; 
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { CourseDetailComponent } from './coursedetail/coursedetail.component';
import { AdminCourseComponent } from './components/AdminCourse/AdminCourse.component';
import { NewComponent } from './components/AdminCourse/New/New.component';
import { EditComponent } from './components/AdminCourse/edit/edit.component';


const routes: Routes = [
  
  { 
    path: "user",
    component: UserLayoutComponent,
    children: [
      {path:"", redirectTo:"/user/courses", pathMatch:"full"},
      {path:"courses", component:CoursesComponent},
      { path:"courses/:id", component: CourseDetailComponent},
      {path:"mycourses", component:MycoursesComponent},
     
      {path:"toolbar", component:ToolbarComponent},
     
      {path:"tooltip", component:TooltipsComponent},
      {path:"editprofile", component:EditProfileComponent}
    ]
  },
  {
    path: "admin",
    component: AdminLayoutComponent,
    children: [
      { path: "", redirectTo: "/admin/dashboard", pathMatch: "full" },
      { path: "dashboard", component: DashboardComponent },
      {path:"coursemanagement", children:[ 
        {path:" ", component:AdminCourseComponent},

        
        {path:"Create", component: NewComponent},
        {path:"Edit", component: EditComponent},



      ]
      },
      {path:"tooltip", component:ToolbarComponent},
      {path:"editprofile", component:EditProfileComponent}
    ]
  },
  { path: "**", redirectTo: "/user/courses", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
