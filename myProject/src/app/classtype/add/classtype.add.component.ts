import { Component, OnInit } from '@angular/core';
import * as toastr from 'toastr'
import { Router } from '@angular/router';
import { ClasstypeService } from '../classtype.service';

@Component({
  selector: 'app-classtype-register',
  templateUrl:'./classtype.add.component.html',
  styleUrls: ['./classtype.add.component.css']
})

export class ClasstypeAddComponent implements OnInit {

  classtype_name = ''

  constructor(
    private router: Router,
    private classtypeService: ClasstypeService) {

    
  }

  ngOnInit() { }

  onClasstypeAdd() {
    this.classtypeService
      .addClasstype(this.classtype_name)
      .subscribe(response => {
        if (response['status'] == 'success') {
          toastr.success('added Class Type successfully')
          this.router.navigate(['/classtype-list'])
        } else {
          console.log(response['error'])
        }
      })
  }
}
