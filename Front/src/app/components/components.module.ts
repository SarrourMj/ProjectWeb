import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { DemoFlexyModule } from '../demo-CourseQuest';
import { MycoursesComponent } from './mycourses/mycourses.component';
import { FormsModule } from '@angular/forms';
import { CoursesComponent } from './courses/courses.component';
import { FooterComponent } from './footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FeatherModule.pick(allIcons),
    DemoFlexyModule,
    MycoursesComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    MycoursesComponent,
   
    
  ],
  declarations: [
  ]
})
export class ComponentsModule { }
