import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CourseSubService {

  http: HttpClient
  url = 'http://localhost:4000/coursesub'

  constructor(http: HttpClient) { 
    this.http=http
  }

  get() {
    return this.http.get(this.url)
  }

  addCourseSub(sub_id: number,course_id:number) {

    const body = {
      sub_id: sub_id,
      course_id:course_id
    }

    return this.http.post(this.url, body)
  }

  deleteCourseSub(id: number) {
    return this.http.delete(this.url + '/' + id)
  }

}
