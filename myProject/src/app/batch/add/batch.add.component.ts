import { Component, OnInit } from '@angular/core';
import { BatchService } from '../batch.service';
import * as toastr from 'toastr'
import { Router } from '@angular/router';
import { CourseService } from '../../course/course.service';

@Component({
  selector: 'app-batch-register',
  templateUrl:'./batch.add.component.html',
  styleUrls: ['./batch.add.component.css']
})

export class BatchAddComponent implements OnInit {

  courses=[]

  batch_name = ''
  course_id:number

  constructor(
    private router: Router,
    private courseservice: CourseService,
    private batchService: BatchService) {

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

    }

  ngOnInit() { }

  onCourseAdd() {
    this.batchService
      .addBatch(this.batch_name,this.course_id)
      .subscribe(response => {
        if (response['status'] == 'success') {
          toastr.success('added Batch successfully')
          this.router.navigate(['/batch-list'])
        } else {
          console.log(response['error'])
        }
      })
  }
}
