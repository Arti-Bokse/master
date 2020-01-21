import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myProject';

  username = ''

  constructor(private router: Router) {
    this.username = sessionStorage['name']
  }

  isAdmin(){
    if(sessionStorage['login_status']==1 && sessionStorage['role']=='Admin'){
      this.username = sessionStorage['name']
      return true
    }else{
      return false
    }
  }

  isStudent(){
    if(sessionStorage['login_status']==1 && sessionStorage['role']=='Student'){
      this.username = sessionStorage['name']
      return true
    }else{
      return false
    }
  }

  isFaculty(){
    if(sessionStorage['login_status']==1 && sessionStorage['role']=='Faculty'){
      this.username = sessionStorage['name']
      return true
    }else{
      return false
    }
  }

  isDefault(){
    if(sessionStorage['login_status']==1){
      return false
    }else{
      return true
    }
  }

  onLogout() {
    // remove the login status
    // sessionStorage.removeItem('login_status')
    sessionStorage.removeItem('login_status')
    this.router.navigate(['/'])
  }

  onAdminLogout(){
    // remove the login status
    // sessionStorage.removeItem('login_status')
    sessionStorage.removeItem('login_status')
    this.router.navigate(['/user-login'])
  }
}
