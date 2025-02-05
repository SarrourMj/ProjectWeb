import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { FormsModule  } from '@angular/forms'

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
import { FooterComponent } from './components/footer/footer.component';
import { InputNumberModule } from 'primeng/inputnumber'; // Import InputNumberModule
import { DropdownModule } from 'primeng/dropdown'; // Import DropdownModule
import { FileUploadModule } from 'primeng/fileupload'; // Import FileUploadModule
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import {NewComponent} from './components/AdminCourse/New/New.component';
import { AdminCourseComponent } from './components/AdminCourse/AdminCourse.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MycoursesComponent } from './components/mycourses/mycourses.component';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    
    AppComponent,
    UserLayoutComponent,
    AdminLayoutComponent,
    CoursesComponent,
    CourseDetailComponent,
    FooterComponent,
    AdminCourseComponent,
    NewComponent
   
    ],
  imports: [
    FileUploadModule,
    DropdownModule,
    InputNumberModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FeatherModule.pick(allIcons),
    DemoFlexyModule,
    DashboardModule,
    ComponentsModule,
    FormsModule,
    TableModule,
    ToastModule,
    InputTextModule,
    ReactiveFormsModule,
    LoginComponent
  ],
  
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
