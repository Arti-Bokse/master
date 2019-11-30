import { Component, OnInit } from '@angular/core';
import { FacultyTypeService } from '../facultytype.service';

@Component({
  selector: 'app-facultytype-list',
  templateUrl:'./facultytype.list.component.html',
  styleUrls: ['./facultytype.list.component.css']
})

export class FactypeListComponent implements OnInit {
  factypes: any[]
  service: FacultyTypeService

  constructor(service: FacultyTypeService) {
    this.service = service
    this.getFactype()
  }

  getFactype() {
    this.service.getFacultyType()
      .subscribe((response) => {
        if (response['status'] == 'success') {
          this.factypes = response['data']
        } else {
          alert('error occured:')
          console.log(response['error'])
        }
      })
  }

  onDelete(id: number) {
    this.service
      .deleteFactype(id)
      .subscribe(response => {
        if (response['status'] == 'success') {
          this.getFactype()
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
