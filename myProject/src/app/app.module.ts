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
import { CourseListComponent } from './course/list/course.list.component';
import { CourseService } from './course/course.service';
import { CourseAddComponent } from './course/add/course.add.component';
import { BatchListComponent } from './batch/list/batch.list.component';
import { BatchService } from './batch/batch.service';
import { BatchAddComponent } from './batch/add/batch.add.component';
import { StudentRegisterComponent } from './student/registration/student.register.component';
import { FactypeAddComponent } from './facultytype/add/facultytype.add.component';
import { FactypeListComponent } from './facultytype/list/facultytype.list.component';
import { VenueListComponent } from './venue/list/venue.list.component';
import { VenueService } from './venue/venue.service';
import { VenueAddComponent } from './venue/add/venue.add.component';
import { ClasstypeAddComponent } from './classtype/add/classtype.add.component';
import { ClasstypeListComponent } from './classtype/list/classtype.list.component';
import { ClasstypeService } from './classtype/classtype.service';
import { SubjectAddComponent } from './subject/add/subject.add.component';
import { SubjectListComponent } from './subject/list/subject.list.component';
import { SubjectService } from './subject/subject.service';
import { CourseSubAddComponent } from './coursesub/add/coursesub.add.component';
import { CourseSubListComponent } from './coursesub/list/coursesub.list.component';
import { CourseSubService } from './coursesub/coursesub.service';
import { CoursecoService } from './courseco/courseco.service';
import { CourseCoListComponent } from './courseco/list/courseco.list.component';
import { CourseCoAddComponent } from './courseco/add/courseco.add.component';


const routes: Route[] = [
  // { path: '', redirectTo: '/user-login', pathMatch: 'full' },

  // the default component
  { path: '', component: FacultyLoginComponent },
  { path: 'user-login', component: FacultyLoginComponent },
  { path: 'user-register', component: FacultyRegisterComponent },
  { path: 'student_list', component: StudentListComponent },
  { path: 'faculty-list', component: FacultyListComponent },
  { path: 'course-list', component: CourseListComponent },
  { path: 'course-add', component: CourseAddComponent },
  { path: 'batch-list', component: BatchListComponent },
  { path: 'batch-add', component: BatchAddComponent },
  { path: 'stud-register', component: StudentRegisterComponent },
  { path: 'factype-list', component: FactypeListComponent },
  { path: 'factype-add', component: FactypeAddComponent },
  { path: 'venue-list', component: VenueListComponent },
  { path: 'venue-add', component: VenueAddComponent },
  { path: 'classtype-list', component: ClasstypeListComponent },
  { path: 'classtype-add', component: ClasstypeAddComponent },
  { path: 'subject-list', component: SubjectListComponent },
  { path: 'subject-add', component: SubjectAddComponent },
  { path: 'coursesub-list', component: CourseSubListComponent },
  { path: 'coursesub-add', component: CourseSubAddComponent },
  { path: 'courseco-list', component: CourseCoListComponent },
  { path: 'courseco-add', component: CourseCoAddComponent }
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
    FacultyListComponent,
    CourseListComponent,
    CourseAddComponent,
    BatchListComponent,
    BatchAddComponent,
    StudentRegisterComponent,
    FactypeAddComponent,
    FactypeListComponent,
    VenueListComponent,
    VenueAddComponent,
    ClasstypeAddComponent,
    ClasstypeListComponent,
    SubjectAddComponent,
    SubjectListComponent,
    CourseSubAddComponent,
    CourseSubListComponent,
    CourseCoListComponent,
    CourseCoAddComponent
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
    FacultyTypeService,
    CourseService,
    BatchService,
    VenueService,
    ClasstypeService,
    SubjectService,
    CourseSubService,
    CoursecoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
