import { Component, OnInit } from '@angular/core';
import { QueriesService } from '../queries.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-queries-list',
  templateUrl: './queries.list.component.html',
  styleUrls: ['./queries.list.component.css']
})

export class QueriesListComponent implements OnInit {
  queries: any[]
  service: QueriesService

  delete=true
  editans=true
  addans=true

  constructor(service: QueriesService, private router: Router, ) {
    this.service = service
    this.getQueries()
    if(sessionStorage['role']=='Student'){
      this.delete=false
      this.editans=false
      this.addans=true
    }
    if(sessionStorage['role']=='Admin' || sessionStorage['role']=='Faculty'){
      this.delete=true
      this.editans=true
      this.addans=false
    }
  }

  getQueries() {
    this.service.get()
      .subscribe((response) => {
        if (response['status'] == 'success') {
          this.queries = response['data']
        } else {
          alert('error occured:')
          console.log(response['error'])
        }
      })
  }

  onDelete(id: number) {
    this.service
      .deleteQueries(id)
      .subscribe(response => {
        if (response['status'] == 'success') {
          this.getQueries()
        } else {
          console.log(response['error'])
        }
      })
  }

  onAdd(qry_id: number, qry_title: string, qry_description: string, qryans_ans: string, qryans_id: number) {
    sessionStorage['qry_desc'] = qry_description
    sessionStorage['qry_id'] = qry_id
    sessionStorage['qry_title'] = qry_title
    sessionStorage['qryans_ans'] = qryans_ans
    sessionStorage['qryans_id'] = qryans_id
    this.router.navigate(['/qryans-add'])
  }

  ngOnInit() { }
}

// class Person {
//   name: string
//   age: number

//   constructor(name: string, age: number) {
//     this.name = name
//     this.age = age
//   }
// }

// const p1 = new Person('person1', 30)
