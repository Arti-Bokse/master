import { Component, OnInit } from '@angular/core';
import * as toastr from 'toastr'
import { Router } from '@angular/router';
import { SubjectService } from '../../subject/subject.service';
import { QueriesService } from '../queries.service';

@Component({
  selector: 'app-queries-register',
  templateUrl:'./queries.add.component.html',
  styleUrls: ['./queries.add.component.css']
})

export class QueriesAddComponent implements OnInit {

  subjects=[]

  qry_title=''
  qry_description=''
  qry_type=''
  stud_id:number

  public edited = false;

  constructor(
    private router: Router,
    private queriesService:QueriesService,
    private subjectService: SubjectService) {

      this.qry_description=sessionStorage['question']

      this.subjectService
      .get()
      .subscribe(response => {
        if (response['status'] == 'success') {
          this.subjects = response['data']
          this.qry_type = this.subjects[0].id
        } else {
          console.log(response['error'])
        }
      })
    }

    changeType(e) {
    
      if((e.target.value)=="general"){
        this.edited=false
        this.qry_type='other'
      }
      else if((e.target.value)=="subrelated"){
        this.edited=true
      }
      
    }

  ngOnInit() {}
  
  onQueryAdd() {
    this.queriesService
      .addQueris(this.qry_title,this.qry_description,this.qry_type,this.stud_id)
      .subscribe(response => {
        if (response['status'] == 'success') {
          toastr.success('added Query successfully')
          this.router.navigate(['/query-list'])
        } else {
          console.log(response['error'])
        }
      })
  }
}
