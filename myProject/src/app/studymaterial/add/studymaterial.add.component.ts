import { Component, OnInit } from '@angular/core';
import * as toastr from 'toastr'
import { Router } from '@angular/router';
import { StudyMaterialService } from '../studymaterial.service';
import { SubjectService } from '../../subject/subject.service';
import { CourseService } from '../../course/course.service';
import { BatchService } from 'src/app/batch/batch.service';

@Component({
  selector: 'app-studymaterial-add',
  templateUrl:'./studymaterial.add.component.html',
  styleUrls: ['./studymaterial.add.component.css']
})

export class StudyMaterialAddComponent implements OnInit {

  courses=[]
  batches=[]
  subjects=[]

  sm_title = ''
  sub_id:number
  course_id:number
  batch_id:number

  sm_attachment:any

  constructor(
    private router: Router,
    private subjectService: SubjectService,
    private courseservice: CourseService,
    private batchservice: BatchService,
    private studyMaterialService: StudyMaterialService) {

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
  }

  ngOnInit() { }

  onSelectFile(event) {
    this.sm_attachment = event.target.files[0]
  }

  onStudyMaterialAdd() {
    this.studyMaterialService
      .addStudyMaterial(this.sm_title, this.sub_id, this.course_id, this.batch_id, this.sm_attachment)
      .subscribe(response => {
        if (response['status'] == 'success') {
          toastr.success('added study material successfully')
          this.router.navigate(['/studymaterial-list'])
        } else {
          console.log(response['error'])
        }
      })
  }
}
