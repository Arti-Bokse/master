import { Component, OnInit } from '@angular/core';
import { FacultyService } from '../faculty.service';
import * as toastr from 'toastr'
import { Router } from '@angular/router';

@Component({
  selector: 'app-faculty-login',
  templateUrl: './faculty.login.component.html',
  styleUrls: ['./faculty.login.component.css']
})

export class FacultyLoginComponent implements OnInit {
  fac_email = ''
  fac_password = ''

  constructor(private router: Router,private facultyService: FacultyService) { 

  }

  ngOnInit() { }

  onLogin() {
    if (this.fac_email.length == 0) {
      toastr.error('enter valid email')
    } else if (this.fac_password.length == 0) {
      toastr.error('enter valid password')
    } else {
      this.facultyService
        .login(this.fac_email, this.fac_password)
        .subscribe(response => {
          if (response['status'] == 'success') {
            toastr.success('authenticated')
            this.router.navigate(['/student_list'])
          } else {
            toastr.error(response['error'])
          }
        })
    }
  }

}
