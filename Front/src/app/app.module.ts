import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
<<<<<<< HEAD
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router';
=======
import { FormsModule  } from '@angular/forms'
>>>>>>> 074191b1ca6a0bdd60e7c9523cfd0cc369796a8e

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
import { HeaderComponent } from './header/header.component';
import { CategoryComponent } from './components/category/category.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog'; // Import ConfirmDialogModule
import { MycoursesComponent } from './components/mycourses/mycourses.component';

import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './components/signup/signup.component';

@NgModule({
  declarations: [
    SignupComponent,
    AppComponent,
    UserLayoutComponent,
    AdminLayoutComponent,
    CoursesComponent,
    CourseDetailComponent,
    FooterComponent,
    AdminCourseComponent,
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
    AppRoutingModule,
    RouterModule       ,
    BrowserAnimationsModule,
    FeatherModule.pick(allIcons),
    DemoFlexyModule,
    DashboardModule,
    ComponentsModule,
    FormsModule, 
    LoginComponent, 
    HomeComponent,
    HeaderComponent,
    FooterComponent,

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
