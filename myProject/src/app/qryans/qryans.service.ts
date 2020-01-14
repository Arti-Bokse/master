import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class QryAnsService {

  http: HttpClient
  url = 'http://localhost:4000/qryans'

  constructor(http: HttpClient) { 
    this.http=http
  }

  addQryAns(qryans_ans: string,qry_id:number) {

    const body = {
      qryans_ans: qryans_ans,
      qry_id:qry_id
    }

    return this.http.post(this.url, body)
  }

  updateQryAns(qryans_ans: string,qryans_id:number) {
    const body = {
      qryans_ans: qryans_ans
    }

    return this.http.put(this.url+ '/' + qryans_id, body)
  }

}
