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

  addFactype(factype_name: string) {
    const body = {
      factype_name: factype_name
    }

    return this.http.post(this.url, body)
  }

  deleteFactype(id: number) {
    return this.http.delete(this.url + '/' + id)
  }

}
