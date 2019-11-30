import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ClasstypeService {

  http: HttpClient
  url = 'http://localhost:4000/classtype'

  constructor(http: HttpClient) { 
    this.http=http
  }

  get() {
    return this.http.get(this.url)
  }

  addClasstype(classtype_name: string) {

    console.log(classtype_name)
    const body = {
      classtype_name: classtype_name
    }

    return this.http.post(this.url, body)
  }

  deleteClassType(id: number) {
    return this.http.delete(this.url + '/' + id)
  }

}
