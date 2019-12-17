import { Component, OnInit } from '@angular/core';
import * as toastr from 'toastr'
import { Router } from '@angular/router';
import { SubjectService } from '../../subject/subject.service';
import { CourseService } from '../../course/course.service';
import { BatchService } from 'src/app/batch/batch.service';
import { DailyScheduleService } from '../dailyschedule.service';
import { VenueService } from '../../venue/venue.service';
import { FacultyService } from '../../faculty/faculty.service';
import { ClasstypeService } from '../../classtype/classtype.service';

@Component({
  selector: 'app-dailyschedule-add',
  templateUrl:'./dailyschedule.add.component.html',
  styleUrls: ['./dailyschedule.add.component.css']
})

export class DailyScheduleAddComponent implements OnInit {

  courses=[]
  batches=[]
  subjects=[]
  venues=[]
  faculties=[]
  classtypes=[]

  dsch_date = ''
  dsch_start = ''
  dsch_end = ''
  sub_id:number
  course_id:number
  batch_id:number
  venue_id:number
  fac_id:number
  classtype_id:number

  sm_attachment:any

  constructor(
    private router: Router,
    private subjectService: SubjectService,
    private courseservice: CourseService,
    private batchservice: BatchService,
    private venueService: VenueService,
    private classtypeService: ClasstypeService,
    private facultyService: FacultyService,
    private dailyScheduleService: DailyScheduleService) {

      this.courseservice
      .get()
      .subscribe(response => {
        if (response['status'] == 'success') {
          this.courses = response['data']
          this.course_id = this.courses[0].id
        } else {
          console.log(response['error'])
        }
      })

      this.batchservice
      .get()
      .subscribe(response => {
        if (response['status'] == 'success') {
          this.batches = response['data']
          console.log(response);
          
          this.batch_id = this.batches[0].id
        } else {
          console.log(response['error'])
        }
      })

      this.subjectService
      .get()
      .subscribe(response => {
        if (response['status'] == 'success') {
          this.subjects = response['data']
          this.sub_id = this.subjects[0].id
        } else {
          console.log(response['error'])
        }
      })

      this.venueService
      .get()
      .subscribe(response => {
        if (response['status'] == 'success') {
          this.venues = response['data']
          this.venue_id = this.venues[0].id
        } else {
          console.log(response['error'])
        }
      })

      this.classtypeService
      .get()
      .subscribe(response => {
        if (response['status'] == 'success') {
          this.classtypes = response['data']
          this.classtype_id = this.classtypes[0].id
        } else {
          console.log(response['error'])
        }
      })

      this.facultyService
      .get()
      .subscribe(response => {
        if (response['status'] == 'success') {
          this.faculties = response['data']
          this.fac_id = this.faculties[0].id
        } else {
          console.log(response['error'])
        }
      })
  }

  ngOnInit() { }

  onSelectFile(event) {
    this.sm_attachment = event.target.files[0]
  }

  onDailyScheduleAdd() {
    this.dailyScheduleService
      .addDailySchedule(this.dsch_date,this.classtype_id,this.dsch_start,this.dsch_end,this.venue_id,this.sub_id,this.course_id,this.batch_id,this.fac_id)
      .subscribe(response => {
        if (response['status'] == 'success') {
          toastr.success('added daily schedule successfully')
          this.router.navigate(['/dailyschedule-list'])
        } else {
          console.log(response['error'])
        }
      })
  }
}
