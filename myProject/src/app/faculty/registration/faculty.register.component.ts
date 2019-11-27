import { Component, OnInit } from '@angular/core';
import { FacultyService } from '../faculty.service';
import * as toastr from 'toastr'
import { Router } from '@angular/router';
import { FacultyTypeService } from 'src/app/facultytype/facultytype.service';

@Component({
  selector: 'app-faculty-register',
  templateUrl: './faculty.register.component.html',
  styleUrls: ['./faculty.register.component.css']
})

export class FacultyRegisterComponent implements OnInit {

  facultyTypes = []

  fac_name = ''
  facultyType: number
  fac_email = ''
  fac_gender = ''
  fac_bdate = ''
  fac_password = ''

  fac_propic:any

  constructor(
    private router: Router,
    private facultyTypeService: FacultyTypeService,
    private facultyService: FacultyService) {

    this.facultyTypeService
      .getFacultyType()
      .subscribe(response => {
        if (response['status'] == 'success') {
          this.facultyTypes = response['data']
          this.facultyType = this.facultyTypes[0].id
        } else {
          console.log(response['error'])
        }
      })
  }

  ngOnInit() { }

  onSelectFile(event) {
    this.fac_propic = event.target.files[0]
  }

  onRegister() {
    this.facultyService
      .registerFaculty(this.fac_name, this.fac_email, this.facultyType, this.fac_gender, this.fac_propic, this.fac_bdate, this.fac_password)
      .subscribe(response => {
        if (response['status'] == 'success') {
          toastr.success('added movie successfully')
          this.router.navigate(['/user-login'])
        } else {
          console.log(response['error'])
        }
      })
  }
}
