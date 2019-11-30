import { Component, OnInit } from '@angular/core';
import * as toastr from 'toastr'
import { Router } from '@angular/router';
import { VenueService } from '../venue.service';

@Component({
  selector: 'app-venue-register',
  templateUrl:'./venue.add.component.html',
  styleUrls: ['./venue.add.component.css']
})

export class VenueAddComponent implements OnInit {

  venue_name = ''

  constructor(
    private router: Router,
    private venueService: VenueService) {

    
  }

  ngOnInit() { }

  onVenueAdd() {
    this.venueService
      .addVenue(this.venue_name)
      .subscribe(response => {
        if (response['status'] == 'success') {
          toastr.success('added Venue successfully')
          this.router.navigate(['/venue-list'])
        } else {
          console.log(response['error'])
        }
      })
  }
}
