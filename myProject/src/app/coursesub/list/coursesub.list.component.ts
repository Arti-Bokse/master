import { Component, OnInit } from '@angular/core';
import { CourseSubService } from '../coursesub.service';

@Component({
  selector: 'app-coursesub-list',
  templateUrl:'./coursesub.list.component.html',
  styleUrls: ['./coursesub.list.component.css']
})

export class CourseSubListComponent implements OnInit {
  coursesubs: any[]
  service: CourseSubService

  constructor(service: CourseSubService) {
    this.service = service
    this.getCourseSub()
  }

  getCourseSub() {
    this.service.get()
      .subscribe((response) => {
        if (response['status'] == 'success') {
          this.coursesubs = response['data']
        } else {
          alert('error occured:')
          console.log(response['error'])
        }
      })
  }

  onDelete(id: number) {
    this.service
      .deleteCourseSub(id)
      .subscribe(response => {
        if (response['status'] == 'success') {
          this.getCourseSub()
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
