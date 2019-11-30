import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import * as toastr from 'toastr'
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-register',
  templateUrl:'./course.add.component.html',
  styleUrls: ['./course.add.component.css']
})

export class CourseAddComponent implements OnInit {

  course_name = ''

  constructor(
    private router: Router,
    private courseService: CourseService) {

    
  }

  ngOnInit() { }

  onCourseAdd() {
    this.courseService
      .addCourse(this.course_name)
      .subscribe(response => {
        if (response['status'] == 'success') {
          toastr.success('added Course successfully')
          this.router.navigate(['/course-list'])
        } else {
          console.log(response['error'])
        }
      })
  }
}
