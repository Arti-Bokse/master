import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class StudentService {

  //http: HttpClient
  url = 'http://localhost:4000/student'

  constructor(
    private router: Router,
    private http: HttpClient) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // check if user is already logged in
    // if (sessionStorage['login_status'] == '1') {
    if (localStorage['login_status'] == '1') {
      return true
    }

    // if user is not logged yet, load the login page
    this.router.navigate(['/student-login'])
    return false
  }

  get() {
    return this.http.get(this.url)
  }

  getStudentByID(stud_id:number){
    return this.http.get(this.url+ '/' + stud_id)
  }

  login(stud_email: string, stud_password: string) {
    const body = {
      stud_email: stud_email,
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
    body.append('role',"Student")

    return this.http.post(this.url + '/register', body)
  }

  deleteStudent(id: number) {
    return this.http.delete(this.url + '/' + id)
  }

}
