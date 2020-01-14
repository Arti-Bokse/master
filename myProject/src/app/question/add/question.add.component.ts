import { Component, OnInit } from '@angular/core';
import * as toastr from 'toastr'
import { Router } from '@angular/router';
import { SubjectService } from '../../subject/subject.service';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-question-register',
  templateUrl:'./question.add.component.html',
  styleUrls: ['./question.add.component.css']
})

export class QuestionAddComponent implements OnInit {

  subjects=[]
  options=[]

  //qs_description, qs_opt_one, qs_opt_two, qs_opt_three, qs_opt_four, qs_ans, qs_ans_description, sub_id
  qs_description=''
  qs_ans=''
  qs_ans_description=''
  qs_opt_one=''
  qs_opt_two=''
  qs_opt_three=''
  qs_opt_four=''
  stud_id:number
  sub_id:number

  public submit = false;
  public addopt = true;

  constructor(
    private router: Router,
    private questionService:QuestionService,
    private subjectService: SubjectService) {

      this.subjectService
      .get()
      .subscribe(response => {
        if (response['status'] == 'success') {
          this.subjects = response['data']
          this.sub_id = this.subjects[0].id
        } else {
          console.log(response['error'])
        }
      })
    }

  ngOnInit() {}

  onOptAdd(){
    this.addopt=false
    this.submit=true
    this.options.push(this.qs_opt_one)
    this.options.push(this.qs_opt_two)
    this.options.push(this.qs_opt_three)
    this.options.push(this.qs_opt_four)
  }
  
  onQueryAdd() {
    this.questionService
      .addQueris(this.qs_description,this.qs_opt_one,this.qs_opt_two,this.qs_opt_three,this.qs_opt_four,this.qs_ans,this.qs_ans_description,this.sub_id,this.stud_id)
      .subscribe(response => {
        if (response['status'] == 'success') {
          toastr.success('added Qustion successfully')
          this.router.navigate(['/question-list'])
        } else {
          console.log(response['error'])
        }
      })
  }
}
