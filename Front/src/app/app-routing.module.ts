import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MycoursesComponent } from './components/mycourses/mycourses.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { TooltipsComponent } from './components/tooltips/tooltips.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FullComponent } from './layouts/full/full.component';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  {
    path:"",
    component:FullComponent,
    children: [
      {path:"", redirectTo:"/home", pathMatch:"full"},
      {path:"home", component:HomeComponent},
   
      

      {path:"mycourses", component:MycoursesComponent},
     
      {path:"toolbar", component:ToolbarComponent},
     
      {path:"tooltip", component:TooltipsComponent},
    ]
  },

  {path:"", redirectTo:"/home", pathMatch:"full"},
  {path:"**", redirectTo:"/home", pathMatch:"full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
