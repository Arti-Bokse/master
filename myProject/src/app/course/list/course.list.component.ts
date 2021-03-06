import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-course-list',
  templateUrl:'./course.list.component.html',
  styleUrls: ['./course.list.component.css']
})

export class CourseListComponent implements OnInit {
  courses: any[]
  service: CourseService

  constructor(service: CourseService) {
    this.service = service
    this.getCourse()
  }

  getCourse() {
    this.service.get()
      .subscribe((response) => {
        if (response['status'] == 'success') {
          this.courses = response['data']
        } else {
          alert('error occured:')
          console.log(response['error'])
        }
      })
  }

  onDelete(id: number) {
    this.service
      .deleteCourse(id)
      .subscribe(response => {
        if (response['status'] == 'success') {
          this.getCourse()
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
