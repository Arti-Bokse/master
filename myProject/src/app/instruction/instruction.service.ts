import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class InstructionService {

  http: HttpClient
  url = 'http://localhost:4000/instruction'
  url1 = 'http://localhost:4000/'

  constructor(http: HttpClient) { 
    this.http=http
  }

  get() {
    return this.http.get(this.url)
  }

  addInstruction(ins_title: string, ins_description: string, int_attachment: any, course_id: number, batch_id: number,ins_type:string) {
    console.log(ins_title)
    console.log(ins_description)
    console.log(int_attachment)
    console.log(course_id)
    console.log(batch_id)
    console.log(ins_type)
    const body = new FormData()
    body.append('ins_title',ins_title)
    body.append('ins_description',ins_description)
    body.append('int_attachment',int_attachment)
    body.append('course_id',''+course_id)
    body.append('batch_id',''+batch_id)
    body.append('ins_type',ins_type)

    return this.http.post(this.url ,body)
  }

  addBatchInstruction(ins_title: string, ins_description: string, int_attachment: any, ins_type:string) {
    console.log(ins_title)
    console.log(ins_description)
    console.log(int_attachment)
    console.log(ins_type)
    const body = new FormData()
    body.append('ins_title',ins_title)
    body.append('ins_description',ins_description)
    body.append('int_attachment',int_attachment)
    body.append('ins_type',ins_type)

    return this.http.post(this.url+ '/allins' ,body)
  }

  deleteInstruction(id: number) {
    return this.http.delete(this.url + '/' + id)
  }

  download(filename: string) {
    console.log(filename)
    return this.http.get(this.url1 + filename, {
      responseType: 'arraybuffer'
    });
  }


}
