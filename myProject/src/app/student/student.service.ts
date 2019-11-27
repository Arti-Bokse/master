import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable()
export class StudentService {

  http: HttpClient
  url = 'http://localhost:4000/student'

  constructor(http: HttpClient) {
    this.http = http
  }

  get() {
    return this.http.get(this.url)
  }

  login(stud_id: number, stud_password: string) {
    const body = {
      stud_id: stud_id,
      stud_password: stud_password
    }

    return this.http.post(this.url + '/login', body)
  }

  //stud_name, stud_email, stud_prn, stud_gender, stud_bdate, stud_propic, stud_password, course_id, batch_id

  registerFaculty(stud_name: string, stud_email: string, stud_prn: number, stud_gender: string, stud_bdate: string, 
    stud_propic: any, stud_password: string, course_id: number, batch_id: number) {
    const body = new FormData()
    body.append('stud_name',stud_name)
    body.append('stud_email',stud_email)
    body.append('stud_prn',''+stud_prn)
    body.append('stud_gender',stud_gender)
    body.append('stud_bdate',stud_bdate)
    body.append('stud_propic',stud_propic)
    body.append('stud_password',stud_password)
    body.append('course_id',''+course_id)
    body.append('batch_id',''+batch_id)

    return this.http.post(this.url + '/register', body)
  }

  deleteFaculty(id: number) {
    return this.http.delete(this.url + '/' + id)
  }

}
