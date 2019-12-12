import { Component, OnInit } from '@angular/core';
import { InstructionService } from '../instruction.service';

@Component({
  selector: 'app-instruction-list',
  templateUrl:'./instruction.list.component.html',
  styleUrls: ['./instruction.list.component.css']
})

export class InstructionListComponent implements OnInit {
  instructions: any[]
  service: InstructionService

  constructor(service: InstructionService) {
    this.service = service
    this.getInstruction()
  }

  getInstruction() {
    this.service.get()
      .subscribe((response) => {
        if (response['status'] == 'success') {
          this.instructions = response['data']
        } else {
          alert('error occured:')
          console.log(response['error'])
        }
      })
  }

  onDelete(id: number) {
    this.service
      .deleteInstruction(id)
      .subscribe(response => {
        if (response['status'] == 'success') {
          this.getInstruction()
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
          this.getInstruction()
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
