import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MycoursesComponent } from './components/mycourses/mycourses.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { CoursesComponent } from './components/courses/courses.component'; 
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { CourseDetailComponent } from './coursedetail/coursedetail.component';
import { SignupComponent } from './components/signup/signup.component';
import { AdminCourseComponent } from './components/AdminCourse/AdminCourse.component';
import { NewComponent } from './components/AdminCourse/New/New.component';
import { EditComponent } from './components/AdminCourse/edit/edit.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CategoryComponent } from './components/category/category.component';
import { MyCertificatesComponent } from './components/mycertificates/mycertificates.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthRedirectGuard } from './guards/auth-redirect.guard';
import { UserGuard } from './guards/user.guard';
import { AdminGuard } from './guards/admin.guard';



const routes: Routes = [
  { 
    path: "home",
    component: HomeComponent
  },
  { 
    path: "login", 
    component: LoginComponent,
    canActivate: [AuthRedirectGuard] 
  },
  {
    path: "signup", 
    component: SignupComponent,
    canActivate: [AuthRedirectGuard],
  },
  { 
    path: "user",
    component: UserLayoutComponent,
    canActivate: [AuthGuard,UserGuard], 
    children: [
      { path: "", redirectTo: "/user/courses", pathMatch: "full" },
      { path: "courses", component: CoursesComponent },
      { path: "courses/:id", component: CourseDetailComponent },
      { path: "mycourses", component: MycoursesComponent },
      { path: "mycertificates", component: MyCertificatesComponent },
      { path: "editprofile", component: EditProfileComponent }
    ]
  },
  {
    path: "admin",
    component: AdminLayoutComponent,
    canActivate: [AuthGuard,AdminGuard], 
    children: [
      { path: "", redirectTo: "/admin/coursemanagement", pathMatch: "full" },
      { path: "coursemanagement", 
        children: [
        { path: "", component: AdminCourseComponent },
        { path: "Create", component: NewComponent },
        { path: "Category", component: CategoryComponent },
        { path: "Edit", component: EditComponent },
      ]},
      { path: "editprofile", component: EditProfileComponent }
    ]
  },
  { path: "**", redirectTo: "/user/courses", pathMatch: "full" },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
