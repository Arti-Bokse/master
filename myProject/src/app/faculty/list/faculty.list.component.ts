import { Component, OnInit } from '@angular/core';
import { FacultyService } from '../faculty.service';

@Component({
  selector: 'app-faculty-list',
  templateUrl: './faculty.list.component.html',
  styleUrls: ['./faculty.list.component.css']
})

export class FacultyListComponent implements OnInit {
  faculties: any[]
  service: FacultyService

  constructor(service: FacultyService) {
    this.service = service
    this.getFaculty()
  }

  getFaculty() {
    this.service.get()
      .subscribe((response) => {
        if (response['status'] == 'success') {
          this.faculties = response['data']
        } else {
          alert('error occured:')
          console.log(response['error'])
        }
      })
  }

  onDelete(id: number) {
    this.service
      .deleteFaculty(id)
      .subscribe(response => {
        if (response['status'] == 'success') {
          this.getFaculty()
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
