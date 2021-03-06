import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CourseService {

  http: HttpClient
  url = 'http://localhost:4000/course'

  constructor(http: HttpClient) { 
    this.http=http
  }

  get() {
    return this.http.get(this.url)
  }

  addCourse(course_name: string) {

    console.log(course_name)
    const body = {
      course_name: course_name
    }

    return this.http.post(this.url, body)
  }

  deleteCourse(id: number) {
    return this.http.delete(this.url + '/' + id)
  }

}
