import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { DemoFlexyModule } from '../demo-LearnSphere';
import { MycoursesComponent } from './mycourses/mycourses.component';
import { FormsModule } from '@angular/forms';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MenuComponent } from './menu/menu.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { CoursesComponent } from './courses/courses.component';

@NgModule({
  imports: [
    CommonModule,
    FeatherModule.pick(allIcons),
    DemoFlexyModule,
    ToolbarComponent,
    MycoursesComponent,
    MenuComponent,
    EditProfileComponent,
    FormsModule
  ],
  exports: [
    MycoursesComponent,
    ToolbarComponent,
    MenuComponent,
    EditProfileComponent,
    
  ]
})
export class ComponentsModule { }
