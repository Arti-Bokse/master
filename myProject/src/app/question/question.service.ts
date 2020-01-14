import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class QuestionService {

  http: HttpClient
  url = 'http://localhost:4000/question'

  constructor(http: HttpClient) { 
    this.http=http
  }

  get(sub_id:number) {
    return this.http.get(this.url+ '/' + sub_id)
  }

  addQueris(qs_description: string,qs_opt_one:string,qs_opt_two:string,qs_opt_three:string,qs_opt_four:string,qs_ans:string,qs_ans_description:string,sub_id:number,stud_id:number) {

    //console.log(qry_type)

    const body = {
      qs_description: qs_description,
      qs_opt_one:qs_opt_one,
      qs_opt_two:qs_opt_two,
      qs_opt_three:qs_opt_three,
      qs_opt_four:qs_opt_four,
      qs_ans:qs_ans,
      qs_ans_description:qs_ans_description,
      sub_id:sub_id,
      stud_id:stud_id
    }

    return this.http.post(this.url, body)
  }

  deleteQueries(id: number) {
    return this.http.delete(this.url + '/' + id)
  }

}
