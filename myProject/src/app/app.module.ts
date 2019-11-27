import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { StudentService } from './student/student.service';
import { StudentListComponent } from './student/list/student.list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'
import { FacultyLoginComponent } from './faculty/login/faculty.login.component';
import { FacultyService } from './faculty/faculty.service';
import { FacultyRegisterComponent } from './faculty/registration/faculty.register.component';
import { FacultyTypeService } from 'src/app/facultytype/facultytype.service';
import { RouterModule, Route } from '@angular/router'
import { FacultyListComponent } from './faculty/list/faculty.list.component';

const routes: Route[] = [
  // { path: '', redirectTo: '/user-login', pathMatch: 'full' },

  // the default component
  { path: '', component: FacultyLoginComponent },

  { path: 'user-login', component: FacultyLoginComponent },
  { path: 'user-register', component: FacultyRegisterComponent },
  { path: 'student_list', component: StudentListComponent },
  { path: 'faculty-list', component: FacultyListComponent }


  // error component
  // - will be launched only when the path is not found
  //{ path: '**', component: NotFoundErrorComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    StudentListComponent,
    FacultyLoginComponent,
    FacultyRegisterComponent,
    FacultyListComponent
  ],
  imports: [
  BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    StudentService,
    FacultyService,
    FacultyTypeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
