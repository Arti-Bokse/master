import { Component, OnInit } from '@angular/core';
import { QueriesService } from '../queries.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-queries-list',
  templateUrl:'./queries.list.component.html',
  styleUrls: ['./queries.list.component.css']
})

export class QueriesListComponent implements OnInit {
  queries: any[]
  service: QueriesService

  constructor(service: QueriesService,private router: Router,) {
    this.service = service
    this.getQueries()
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

  onAdd(){
    sessionStorage['question'] = 'what is today schedule'
    this.router.navigate(['/query-add'])
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
