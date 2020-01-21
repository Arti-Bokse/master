import { Component, OnInit } from '@angular/core';
import * as toastr from 'toastr'
import { Router, ActivatedRoute } from '@angular/router';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './student.login.component.html',
  styleUrls: ['./student.login.component.css']
})

export class StudentLoginComponent implements OnInit {
  email = ''
  password = ''
  componentToLaunch = 'student_list'
  rememberme = false

  constructor(
    private activatedRoute: ActivatedRoute,
    private rotuer: Router,
    private studentService: StudentService) {

    console.log(activatedRoute.snapshot.queryParams)
    this.componentToLaunch = activatedRoute.snapshot.queryParams['screen']

  }

  ngOnInit() { }

  onLogin() {
    if (this.email.length == 0) {
      toastr.error('enter valid email')
    } else if (this.password.length == 0) {
      toastr.error('enter valid password')
    } else {
      this.studentService
        .login(this.email, this.password)
        .subscribe(response => {
          if (response['status'] == 'success') {
            toastr.success('authenticated')

            sessionStorage['login_status'] = '1'
      
            sessionStorage['id'] = response['data']['stud_id']
            sessionStorage['name'] = response['data']['stud_name']
            sessionStorage['role'] = response['data']['role']
            this.rotuer.navigate(['/student-profile'])

            // // redirect to add movie screen
            // if (this.componentToLaunch && this.componentToLaunch.length > 0) {
            //   this.rotuer.navigate(['/' + this.componentToLaunch])
            // } else {
            //   this.rotuer.navigate(['/movies-add'])
            // }
          } else {
            toastr.error(response['error'])
          }
        })
    }
  }

}
