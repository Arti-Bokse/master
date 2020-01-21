import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-profile',
  templateUrl:'./student.profile.component.html',
  styleUrls: ['./student.profile.component.css']
})

export class StudentProfileComponent implements OnInit {
  student: any
  service: StudentService

  constructor(service: StudentService) {
    this.service = service
    this.getStudentByID()
  }

  getStudentByID() {
    this.service.getStudentByID(sessionStorage['id'])
      .subscribe((response) => {
        if (response['status'] == 'success') {
          this.student = response['data']
          console.log(this.student)
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
