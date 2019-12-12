import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class StudyMaterialService {

  http: HttpClient
  url = 'http://localhost:4000/studymaterial'
  url1 = 'http://localhost:4000/'

  constructor(http: HttpClient) { 
    this.http=http
  }

  get() {
    return this.http.get(this.url)
  }

  addStudyMaterial(sm_title: string, sub_id: number, course_id: number, batch_id: number, sm_attachment: any) {
    console.log(sm_title)
    const body = new FormData()
    body.append('sm_title',sm_title)
    body.append('sub_id',''+sub_id)
    body.append('course_id',''+course_id)
    body.append('batch_id',''+batch_id)
    body.append('sm_attachment',sm_attachment)

    return this.http.post(this.url ,body)
  }

  deleteStudyMaterial(id: number) {
    return this.http.delete(this.url + '/' + id)
  }

  download(filename: string) {
    console.log(filename)
    return this.http.get(this.url1 + filename, {
      responseType: 'arraybuffer'
    });
  }

}
