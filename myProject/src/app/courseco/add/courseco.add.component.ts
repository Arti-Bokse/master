import { Component, OnInit } from '@angular/core';
import * as toastr from 'toastr'
import { Router } from '@angular/router';
import { CourseService } from '../../course/course.service';
import { CoursecoService } from '../courseco.service';
import { BatchService } from '../../batch/batch.service';
import { FacultyService } from '../../faculty/faculty.service';

@Component({
  selector: 'app-courseco-register',
  templateUrl:'./courseco.add.component.html',
  styleUrls: ['./courseco.add.component.css']
})

export class CourseCoAddComponent implements OnInit {

  courses=[]
  batches=[]
  faculties=[]

  batch_id:number
  course_id:number
  fac_id:number

  constructor(
    private router: Router,
    private courseservice: CourseService,
    private coursecoService:CoursecoService,
    private batchService: BatchService,
    private facultyService: FacultyService) {

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

      this.batchService
      .get()
      .subscribe(response => {
        if (response['status'] == 'success') {
          this.batches = response['data']
          this.batch_id = this.batches[0].id
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

  onCoursecoAdd() {
    this.coursecoService
      .addCourseCo(this.course_id,this.batch_id,this.fac_id)
      .subscribe(response => {
        if (response['status'] == 'success') {
          toastr.success('added course coordinator successfully')
          this.router.navigate(['/courseco-list'])
        } else {
          console.log(response['error'])
        }
      })
  }
}
