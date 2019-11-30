import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class VenueService {

  http: HttpClient
  url = 'http://localhost:4000/venue'

  constructor(http: HttpClient) { 
    this.http=http
  }

  get() {
    return this.http.get(this.url)
  }

  addVenue(venue_name: string) {

    console.log(venue_name)
    const body = {
      venue_name: venue_name
    }

    return this.http.post(this.url, body)
  }

  deleteVenue(id: number) {
    return this.http.delete(this.url + '/' + id)
  }

}
