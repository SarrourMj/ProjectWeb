import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { DemoFlexyModule } from './demo-CourseQuest'
import { MatToolbarModule } from '@angular/material/toolbar';
import { HTTP_INTERCEPTORS } from '@angular/common/http'; // Import the HTTP_INTERCEPTORS token

// Modules
import { DashboardModule } from './dashboard/dashboard.module';
import { ComponentsModule } from './components/components.module';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import {  HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

import { CoursesComponent } from './components/courses/courses.component';
import { CourseDetailComponent } from './components/coursedetail/coursedetail.component';
import { InputNumberModule } from 'primeng/inputnumber'; // Import InputNumberModule
import { DropdownModule } from 'primeng/dropdown'; // Import DropdownModule
import { FileUploadModule } from 'primeng/fileupload'; // Import FileUploadModule
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import {NewComponent} from './components/AdminCourse/New/New.component';
import { AdminCourseComponent } from './components/AdminCourse/admincourses/AdminCourse.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { CategoryComponent } from './components/category/category.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog'; // Import ConfirmDialogModule
import { AuthInterceptor } from './interceptors/auth.interceptor'; // Import the interceptor

import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './components/signup/signup.component';


@NgModule({
  declarations: [
    SignupComponent,
    AppComponent,
    UserLayoutComponent,
    AdminLayoutComponent,
    AdminCourseComponent,
    CoursesComponent,
    CourseDetailComponent,
    
    NewComponent,
    CategoryComponent,
   
    ],
  imports: [
    ConfirmDialogModule,
    FileUploadModule,
    DropdownModule,
    InputNumberModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule       ,
    BrowserAnimationsModule,
    FeatherModule.pick(allIcons),
    DemoFlexyModule,
    DashboardModule,
    ComponentsModule,
    FormsModule, 
    MatToolbarModule,
    LoginComponent, 
    HomeComponent,
    HeaderComponent,
    

    TableModule,
    ToastModule,
    InputTextModule,
    ReactiveFormsModule,
    
  ],
  
  providers: [MessageService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
