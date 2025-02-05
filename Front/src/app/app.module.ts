import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { DemoFlexyModule } from './demo-LearnSphere'

// Modules
import { DashboardModule } from './dashboard/dashboard.module';
import { ComponentsModule } from './components/components.module';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

import { CoursesComponent } from './components/courses/courses.component';
import { CourseDetailComponent } from './coursedetail/coursedetail.component';
import { MycoursesComponent } from './components/mycourses/mycourses.component';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    
    AppComponent,
    UserLayoutComponent,
    AdminLayoutComponent,
    CoursesComponent,
    CourseDetailComponent
    ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FeatherModule.pick(allIcons),
    DemoFlexyModule,
    DashboardModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
