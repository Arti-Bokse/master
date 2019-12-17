import { Component, OnInit } from '@angular/core';
import { DailyScheduleService } from '../dailyschedule.service';

@Component({
  selector: 'app-dailyschedule-list',
  templateUrl:'./dailyschedule.list.component.html',
  styleUrls: ['./dailyschedule.list.component.css']
})

export class DailyScheduleListComponent implements OnInit {
  dailyschedules: any[]
  service: DailyScheduleService

  constructor(service: DailyScheduleService) {
    this.service = service
    this.getDailySchedule()
  }

  getDailySchedule() {
    this.service.get()
      .subscribe((response) => {
        if (response['status'] == 'success') {
          this.dailyschedules = response['data']
        } else {
          alert('error occured:')
          console.log(response['error'])
        }
      })
  }

  onDelete(id: number) {
    this.service
      .deleteDailySchedule(id)
      .subscribe(response => {
        if (response['status'] == 'success') {
          this.getDailySchedule()
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
