import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PerformanceService {

  http: HttpClient
  url = 'http://localhost:4000/performance'

  constructor(http: HttpClient) { 
    this.http=http
  }

  get() {
    return this.http.get(this.url)
  }

  addBatch(batch_name: string,course_id:number) {

    const body = {
      batch_name: batch_name,
      course_id:course_id
    }

    return this.http.post(this.url, body)
  }

  deleteBatch(id: number) {
    return this.http.delete(this.url + '/' + id)
  }

}
