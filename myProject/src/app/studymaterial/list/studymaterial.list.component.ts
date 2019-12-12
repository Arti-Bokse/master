import { Component, OnInit } from '@angular/core';
import { StudyMaterialService } from '../studymaterial.service';

@Component({
  selector: 'app-studymaterial-list',
  templateUrl:'./studymaterial.list.component.html',
  styleUrls: ['./studymaterial.list.component.css']
})

export class StudyMaterialListComponent implements OnInit {
  studymaterials: any[]
  service: StudyMaterialService

  constructor(service: StudyMaterialService) {
    this.service = service
    this.getStudyMaterial()
  }

  getStudyMaterial() {
    this.service.get()
      .subscribe((response) => {
        if (response['status'] == 'success') {
          this.studymaterials = response['data']
        } else {
          alert('error occured:')
          console.log(response['error'])
        }
      })
  }

  onDelete(id: number) {
    this.service
      .deleteStudyMaterial(id)
      .subscribe(response => {
        if (response['status'] == 'success') {
          this.getStudyMaterial()
        } else {
          console.log(response['error'])
        }
      })
  }

  download(file:string){
    this.service
      .download(file)
      .subscribe(response => {
        if (response['status'] == 'success') {
          this.getStudyMaterial()
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
