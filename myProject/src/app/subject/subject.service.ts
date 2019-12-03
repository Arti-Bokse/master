import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SubjectService {

  http: HttpClient
  url = 'http://localhost:4000/subject'

  constructor(http: HttpClient) { 
    this.http=http
  }

  get() {
    return this.http.get(this.url)
  }

  addSubject(subject_name: string) {

    console.log(subject_name)
    const body = {
      sub_name: subject_name
    }

    return this.http.post(this.url, body)
  }

  deleteSubject(id: number) {
    return this.http.delete(this.url + '/' + id)
  }

}
