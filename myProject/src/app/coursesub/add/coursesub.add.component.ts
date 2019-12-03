import { Component, OnInit } from '@angular/core';
import * as toastr from 'toastr'
import { Router } from '@angular/router';
import { CourseService } from '../../course/course.service';
import { CourseSubService } from '../coursesub.service';
import { SubjectService } from '../../subject/subject.service';

@Component({
  selector: 'app-coursesub-register',
  templateUrl:'./coursesub.add.component.html',
  styleUrls: ['./coursesub.add.component.css']
})

export class CourseSubAddComponent implements OnInit {

  courses=[]
  subjects=[]

  sub_id:number
  course_id:number

  constructor(
    private router: Router,
    private courseservice: CourseService,
    private courseSubService:CourseSubService,
    private subjectService: SubjectService) {

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
    }

  ngOnInit() { }

  onCourseSubAdd() {
    this.courseSubService
      .addCourseSub(this.sub_id,this.course_id)
      .subscribe(response => {
        if (response['status'] == 'success') {
          toastr.success('added coursewisw subject successfully')
          this.router.navigate(['/coursesub-list'])
        } else {
          console.log(response['error'])
        }
      })
  }
}
