import { Component, OnInit } from '@angular/core';
import * as toastr from 'toastr'
import { Router } from '@angular/router';
import { SubjectService } from '../subject.service';

@Component({
  selector: 'app-subject-register',
  templateUrl:'./subject.add.component.html',
  styleUrls: ['./subject.add.component.css']
})

export class SubjectAddComponent implements OnInit {

  subject_name = ''

  constructor(
    private router: Router,
    private subjectService: SubjectService) {

    
  }

  ngOnInit() { }

  onSubjectAdd() {
    this.subjectService
      .addSubject(this.subject_name)
      .subscribe(response => {
        if (response['status'] == 'success') {
          toastr.success('added subject successfully')
          this.router.navigate(['/subject-list'])
        } else {
          console.log(response['error'])
        }
      })
  }
}
