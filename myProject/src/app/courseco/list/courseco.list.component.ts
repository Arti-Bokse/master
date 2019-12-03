import { Component, OnInit } from '@angular/core';
import { CoursecoService } from '../courseco.service';

@Component({
  selector: 'app-courseco-list',
  templateUrl:'./courseco.list.component.html',
  styleUrls: ['./courseco.list.component.css']
})

export class CourseCoListComponent implements OnInit {
  coursecos: any[]
  service: CoursecoService

  constructor(service: CoursecoService) {
    this.service = service
    this.getCourseco()
  }

  getCourseco() {
    this.service.get()
      .subscribe((response) => {
        if (response['status'] == 'success') {
          this.coursecos = response['data']
        } else {
          alert('error occured:')
          console.log(response['error'])
        }
      })
  }

  onDelete(id: number) {
    this.service
      .deleteCourseCo(id)
      .subscribe(response => {
        if (response['status'] == 'success') {
          this.getCourseco()
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
