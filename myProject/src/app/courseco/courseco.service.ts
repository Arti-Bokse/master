import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CoursecoService {

  http: HttpClient
  url = 'http://localhost:4000/course_coordi'

  constructor(http: HttpClient) { 
    this.http=http
  }

  get() {
    return this.http.get(this.url)
  }

  addCourseCo(course_id:number,batch_id:number,fac_id:number) {

    const body = {
      course_id:course_id,
      batch_id:batch_id,
      fac_id:fac_id
      
    }

    return this.http.post(this.url, body)
  }

  deleteCourseCo(id: number) {
    return this.http.delete(this.url + '/' + id)
  }

}
