import { Component, OnInit } from '@angular/core';
//import { QuestionService } from '../queries.service';
import { Router } from '@angular/router';
import { QuestionService } from '../question.service';
import { SubjectService } from '../../subject/subject.service';


@Component({
  selector: 'app-question-list',
  templateUrl:'./question.list.component.html',
  styleUrls: ['./question.list.component.css']
})

export class QuestionListComponent implements OnInit {
  questions: any[]
  subjects=[]
  service: QuestionService

  sub_id:number

  constructor(service: QuestionService,
    private subjectService: SubjectService,
    private router: Router) {
    this.service = service

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

  changeSub(e) {
    
    this.sub_id=e.target.value
    this.getQuestion()
    
  }

  getQuestion() {
    this.service.get(this.sub_id)
      .subscribe((response) => {
        if (response['status'] == 'success') {
          this.questions = response['data']
        } else {
          alert('error occured:')
          console.log(response['error'])
        }
      })
  }

  onDelete(id: number) {
    this.service
      .deleteQueries(id)
      .subscribe(response => {
        if (response['status'] == 'success') {
          this.getQuestion()
        } else {
          console.log(response['error'])
        }
      })
  }

  ngOnInit() { }
}
