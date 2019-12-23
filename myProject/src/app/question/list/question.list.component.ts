import { Component, OnInit } from '@angular/core';
//import { QuestionService } from '../queries.service';
import { Router } from '@angular/router';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-question-list',
  templateUrl:'./question.list.component.html',
  styleUrls: ['./question.list.component.css']
})

export class QueriesListComponent implements OnInit {
  questions: any[]
  service: QuestionService

  constructor(service: QuestionService,private router: Router,) {
    this.service = service
    this.getQueries()
  }

  getQueries() {
    this.service.get()
      .subscribe((response) => {
        if (response['status'] == 'success') {
          this.questions = response['data']
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

  onAdd(qry_id:number,qry_title:string,qry_description:string,qryans_ans:string,qryans_id:number){
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
