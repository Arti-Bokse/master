import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class QuestionService {

  http: HttpClient
  url = 'http://localhost:4000/question'

  constructor(http: HttpClient) { 
    this.http=http
  }

  get() {
    return this.http.get(this.url)
  }

  addQueris(qry_title: string,qry_description:string,qry_type:string,stud_id:number) {

    console.log(qry_type)

    const body = {
      qry_title: qry_title,
      qry_description:qry_description,
      qry_type:qry_type,
      stud_id:stud_id
    }

    return this.http.post(this.url, body)
  }

  deleteQueries(id: number) {
    return this.http.delete(this.url + '/' + id)
  }

}
