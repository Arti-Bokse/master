import { Component, OnInit } from '@angular/core';
import { VenueService } from '../venue.service';

@Component({
  selector: 'app-venue-list',
  templateUrl:'./venue.list.component.html',
  styleUrls: ['./venue.list.component.css']
})

export class VenueListComponent implements OnInit {
  venues: any[]
  service: VenueService

  constructor(service: VenueService) {
    this.service = service
    this.getVenue()
  }

  getVenue() {
    this.service.get()
      .subscribe((response) => {
        if (response['status'] == 'success') {
          this.venues = response['data']
        } else {
          alert('error occured:')
          console.log(response['error'])
        }
      })
  }

  onDelete(id: number) {
    this.service
      .deleteVenue(id)
      .subscribe(response => {
        if (response['status'] == 'success') {
          this.getVenue()
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
