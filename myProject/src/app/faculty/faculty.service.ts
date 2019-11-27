import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FacultyService {

  http: HttpClient
  url = 'http://localhost:4000/faculty'

  constructor(http: HttpClient) { 
    this.http=http
  }

  get() {
    return this.http.get(this.url)
  }

  login(fac_email: string, fac_password: string) {
    const body = {
      fac_email: fac_email,
      fac_password: fac_password
    }

    return this.http.post(this.url + '/login', body)
  }

  registerFaculty(fac_name: string, fac_email: string, facultyType: number, fac_gender: string, fac_propic: any, fac_bdate: string, fac_password: string) {
    const body = new FormData()
    body.append('fac_name',fac_name)
    body.append('fac_email',fac_email)
    body.append('factype_id',''+facultyType)
    body.append('fac_gender',fac_gender)
    body.append('fac_propic',fac_propic)
    body.append('fac_bdate',fac_bdate)
    body.append('fac_password',fac_password)

    return this.http.post(this.url + '/register', body)
  }

  deleteFaculty(id: number) {
    return this.http.delete(this.url + '/' + id)
  }

}
