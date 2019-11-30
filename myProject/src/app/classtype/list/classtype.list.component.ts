import { Component, OnInit } from '@angular/core';
import { ClasstypeService } from '../classtype.service';

@Component({
  selector: 'app-classtype-list',
  templateUrl:'./classtype.list.component.html',
  styleUrls: ['./classtype.list.component.css']
})

export class ClasstypeListComponent implements OnInit {
  classtypes: any[]
  service: ClasstypeService

  constructor(service: ClasstypeService) {
    this.service = service
    this.getClassType()
  }

  getClassType() {
    this.service.get()
      .subscribe((response) => {
        if (response['status'] == 'success') {
          this.classtypes = response['data']
        } else {
          alert('error occured:')
          console.log(response['error'])
        }
      })
  }

  onDelete(id: number) {
    this.service
      .deleteClassType(id)
      .subscribe(response => {
        if (response['status'] == 'success') {
          this.getClassType()
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
