import { Component, OnInit } from '@angular/core';
import * as toastr from 'toastr'
import { Router } from '@angular/router';
import { QryAnsService } from '../qryans.service';

@Component({
  selector: 'app-qryans-register',
  templateUrl:'./qryans.add.component.html',
  styleUrls: ['./qryans.add.component.css']
})

export class QryAnsAddComponent implements OnInit {

  subjects=[]

  qry_id:number
  qry_title=''
  qry_description=''
  qryans_ans=''
  qryans_id:number

  public add = true
  public update = false

  constructor(
    private router: Router,
    private qryAnsService:QryAnsService) {

      this.qry_description=sessionStorage['qry_desc']
      this.qry_id=sessionStorage['qry_id']
      this.qry_title=sessionStorage['qry_title']
      this.qryans_ans=sessionStorage['qryans_ans']
      this.qryans_id=sessionStorage['qryans_id']
      if(this.qryans_ans!="null"){
        this.add = false
        this.update = true
      }else if(this.qryans_ans=="null"){
        this.qryans_ans=''
        this.add = true
        this.update = false
      }
    }

  ngOnInit() {}
  
  onQueryAdd() {
    this.qryAnsService
      .addQryAns(this.qryans_ans,this.qry_id)
      .subscribe(response => {
        if (response['status'] == 'success') {
          toastr.success('added Query answer successfully')
          this.router.navigate(['/query-list'])
        } else {
          console.log(response['error'])
        }
      })
  }

  onQueryUpdate() {
    this.qryAnsService
      .updateQryAns(this.qryans_ans,this.qryans_id)
      .subscribe(response => {
        if (response['status'] == 'success') {
          toastr.success('updated Query answer successfully')
          this.router.navigate(['/query-list'])
        } else {
          console.log(response['error'])
        }
      })
  }

}
