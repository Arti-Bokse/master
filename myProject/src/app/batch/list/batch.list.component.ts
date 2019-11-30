import { Component, OnInit } from '@angular/core';
import { BatchService } from '../batch.service';

@Component({
  selector: 'app-batch-list',
  templateUrl:'./batch.list.component.html',
  styleUrls: ['./batch.list.component.css']
})

export class BatchListComponent implements OnInit {
  batches: any[]
  service: BatchService

  constructor(service: BatchService) {
    this.service = service
    this.getBatch()
  }

  getBatch() {
    this.service.get()
      .subscribe((response) => {
        if (response['status'] == 'success') {
          this.batches = response['data']
        } else {
          alert('error occured:')
          console.log(response['error'])
        }
      })
  }

  onDelete(id: number) {
    this.service
      .deleteBatch(id)
      .subscribe(response => {
        if (response['status'] == 'success') {
          this.getBatch()
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
