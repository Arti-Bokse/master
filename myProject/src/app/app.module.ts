import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { StudentService } from './student/student.service';
import { StudentListComponent } from './student/list/student.list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms'
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
import { StudyMaterialAddComponent } from './studymaterial/add/studymaterial.add.component';
import { StudyMaterialListComponent } from './studymaterial/list/studymaterial.list.component';
import { StudyMaterialService } from './studymaterial/studymaterial.service';
import { InstructionService } from './instruction/instruction.service';
import { InstructionAddComponent } from './instruction/add/instruction.add.component';
import { InstructionListComponent } from './instruction/list/instruction.list.component';
import { DailyScheduleListComponent } from './dailyschedule/list/dailyschedule.list.component';
import { DailyScheduleService } from './dailyschedule/dailyschedule.service';
import { DailyScheduleAddComponent } from './dailyschedule/add/dailyschedule.add.component';
import { QueriesAddComponent } from './queries/add/queries.add.component';
import { QueriesListComponent } from './queries/list/queries.list.component';
import { QueriesService } from './queries/queries.service';
import { QryAnsAddComponent } from './qryans/add/qryans.add.component';
import { QryAnsService } from './qryans/qryans.service';
import { QuestionService } from './question/question.service';
import { QuestionListComponent } from './question/list/question.list.component';
import { QuestionAddComponent } from './question/add/question.add.component';
import { StudentLoginComponent } from './student/login/student.login.component';
import { StudentProfileComponent } from './student/profile/student.profile.component';
import { InstructionDetailComponent } from './instruction/detail/instruction.detail.component';
import { DailyScheduleDetailComponent } from './dailyschedule/detail/dailyschedule.detail.component';
import { StudyMaterialDetailComponent } from './studymaterial/detail/studymaterial.detail.component';

const routes: Route[] = [
  // { path: '', redirectTo: '/user-login', pathMatch: 'full' },

  // the default component
  { path: '', component: StudentLoginComponent },
  { path: 'user-login', component: FacultyLoginComponent },
  { path: 'user-register', component: FacultyRegisterComponent },
  { path: 'student_list', component: StudentListComponent},
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
  { path: 'courseco-add', component: CourseCoAddComponent },
  { path: 'studymaterial-list', component: StudyMaterialListComponent },
  { path: 'studymaterial-detail', component: StudyMaterialDetailComponent },
  { path: 'studymaterial-add', component: StudyMaterialAddComponent },
  { path: 'instruction-list', component: InstructionListComponent },
  { path: 'instruction-detail', component: InstructionDetailComponent },
  { path: 'instruction-add', component: InstructionAddComponent },
  { path: 'dailyschedule-list', component: DailyScheduleListComponent },
  { path: 'dailyschedule-detail', component: DailyScheduleDetailComponent },
  { path: 'dailyschedule-add', component: DailyScheduleAddComponent },
  { path: 'query-list', component: QueriesListComponent },
  { path: 'query-add', component: QueriesAddComponent },
  { path: 'qryans-add', component: QryAnsAddComponent },
  { path: 'question-list', component: QuestionListComponent },
  { path: 'question-add', component: QuestionAddComponent },
  { path: 'student-login', component: StudentLoginComponent },
  { path: 'student-profile', component: StudentProfileComponent }
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
    CourseCoAddComponent,
    StudyMaterialAddComponent,
    StudyMaterialListComponent,
    InstructionAddComponent,
    InstructionListComponent,
    DailyScheduleListComponent,
    DailyScheduleAddComponent,
    QueriesAddComponent,
    QueriesListComponent,
    QryAnsAddComponent,
    QuestionListComponent,
    QuestionAddComponent,
    StudentLoginComponent,
    StudentProfileComponent,
    InstructionDetailComponent,
    DailyScheduleDetailComponent,
    StudyMaterialDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
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
    CoursecoService,
    StudyMaterialService,
    InstructionService,
    DailyScheduleService,
    QueriesService,
    QryAnsService,
    QuestionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
