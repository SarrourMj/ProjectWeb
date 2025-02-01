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
<<<<<<< HEAD
      {path:"home", component:HomeComponent},
      {path:"alerts", component:AlertsComponent},
      {path:"forms", component:FormsComponent},
      {path:"table", component:ProductComponent},
      {path:"grid-list", component:GridListComponent},
      {path:"menu", component:MenuComponent},
      {path:"tabs", component:TabsComponent},
      {path:"expansion", component:ExpansionComponent},
      {path:"chips", component:ChipsComponent},
      {path:"progress", component:ProgressComponent},
=======
      {path:"home", component:DashboardComponent},
   
      

      {path:"mycourses", component:MycoursesComponent},
     
>>>>>>> 463ac9d07a6788ec7a0ed812085311fe60380602
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
