import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import * as toastr from 'toastr'
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-register',
  templateUrl: './student.register.component.html',
  styleUrls: ['./student.register.component.css']
})

export class StudentRegisterComponent implements OnInit {

  facultyTypes = []

  stud_name = ''
  stud_email= ''
  stud_prn: number
  stud_gender = ''
  stud_bdate = ''
  stud_password= ''
  course_id: number
  batch_id: number

  stud_propic:any

  constructor(
    private router: Router,
    private studentService: StudentService) {
  }

  ngOnInit() { }

  onSelectFile(event) {
    this.stud_propic = event.target.files[0]
  }

  onRegister() {
    this.studentService
      .registerFaculty(this.stud_name, this.stud_email, this.stud_prn, this.stud_gender, this.stud_bdate, this.stud_propic, this.stud_password, 
        this.course_id, this.batch_id)
      .subscribe(response => {
        if (response['status'] == 'success') {
          toastr.success('added student successfully')
          this.router.navigate(['/stud-login'])
        } else {
          console.log(response['error'])
        }
      })
  }
}
