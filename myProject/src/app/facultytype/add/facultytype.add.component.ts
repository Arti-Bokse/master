import { Component, OnInit } from '@angular/core';
import * as toastr from 'toastr'
import { Router } from '@angular/router';
import { FacultyTypeService } from 'src/app/facultytype/facultytype.service';

@Component({
  selector: 'app-facultytype-register',
  templateUrl:'./facultytype.add.component.html',
  styleUrls: ['./facultytype.add.component.css']
})

export class FactypeAddComponent implements OnInit {

  factype_name = ''

  constructor(
    private router: Router,
    private facultyTypeService: FacultyTypeService) {

    
  }

  ngOnInit() { }

  onFactypeAdd() {
    this.facultyTypeService
      .addFactype(this.factype_name)
      .subscribe(response => {
        if (response['status'] == 'success') {
          toastr.success('added faculty type successfully')
          this.router.navigate(['/factype-list'])
        } else {
          console.log(response['error'])
        }
      })
  }
}
