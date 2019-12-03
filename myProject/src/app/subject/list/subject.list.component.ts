import { Component, OnInit } from '@angular/core';
import { SubjectService } from '../subject.service';

@Component({
  selector: 'app-subject-list',
  templateUrl:'./subject.list.component.html',
  styleUrls: ['./subject.list.component.css']
})

export class SubjectListComponent implements OnInit {
  subjects: any[]
  service: SubjectService

  constructor(service: SubjectService) {
    this.service = service
    this.getSubject()
  }

  getSubject() {
    this.service.get()
      .subscribe((response) => {
        if (response['status'] == 'success') {
          this.subjects = response['data']
        } else {
          alert('error occured:')
          console.log(response['error'])
        }
      })
  }

  onDelete(id: number) {
    this.service
      .deleteSubject(id)
      .subscribe(response => {
        if (response['status'] == 'success') {
          this.getSubject()
        } else {
          console.log(response['error'])
        }
      })
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
