import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student.list.component.html',
  styleUrls: ['./student.list.component.css']
})

export class StudentListComponent implements OnInit {
  students: any[]
  service: StudentService

  constructor(service: StudentService) {
    this.service = service
    this.getStudents()
  }

  getStudents() {
    this.service.get()
      .subscribe((response) => {
        if (response['status'] == 'success') {
          this.students = response['data']
        } else {
          alert('error occured:')
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
