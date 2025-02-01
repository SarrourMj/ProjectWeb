import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { DemoFlexyModule } from '../demo-LearnSphere';
import { MycoursesComponent } from './mycourses/mycourses.component';
import { FormsModule } from '@angular/forms';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { TooltipsComponent } from './tooltips/tooltips.component'
import { MenuComponent } from './menu/menu.component';


@NgModule({
  imports: [
    CommonModule,
    FeatherModule.pick(allIcons),
    DemoFlexyModule,
    ToolbarComponent,
    MycoursesComponent,
    MenuComponent,
    TooltipsComponent,
    FormsModule
  ],
  exports: [

    MycoursesComponent,
  
    ToolbarComponent,
    MenuComponent,
    
  ]
})
export class ComponentsModule { }
