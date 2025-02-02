import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MycoursesComponent } from './components/mycourses/mycourses.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { TooltipsComponent } from './components/tooltips/tooltips.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { HomeComponent } from './components/home/home.component'; 
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';



const routes: Routes = [
  
  {
    path: "user",
    component: UserLayoutComponent,
    children: [
      {path:"", redirectTo:"/home", pathMatch:"full"},
      {path:"home", component:HomeComponent},
   
      

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
      {path:"coursemanagement", component:ToolbarComponent},  
      {path:"usermanagement", component:ToolbarComponent},
      {path:"tooltip", component:ToolbarComponent},
      {path:"editprofile", component:EditProfileComponent}
    ]
  },
  { path: "**", redirectTo: "/user/home", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
