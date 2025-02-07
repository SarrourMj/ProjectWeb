import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { DemoFlexyModule } from '../demo-CourseQuest';
import { MycoursesComponent } from './mycourses/mycourses.component';
import { FormsModule } from '@angular/forms';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { CoursesComponent } from './courses/courses.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    FeatherModule.pick(allIcons),
    DemoFlexyModule,
    MycoursesComponent,
    EditProfileComponent,
    FormsModule
  ],
  exports: [
    MycoursesComponent,
   
    EditProfileComponent,
    
  ],
  declarations: [
  ]
})
export class ComponentsModule { }
