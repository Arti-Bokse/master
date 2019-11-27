import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable()
export class FacultyTypeService {

  http: HttpClient
  url = 'http://localhost:4000/facultytype'

  constructor(http: HttpClient) {
    this.http = http
  }

  getFacultyType() {
    return this.http.get(this.url)
  }

}
