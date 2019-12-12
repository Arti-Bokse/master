import { Component, OnInit } from '@angular/core';
import * as toastr from 'toastr'
import { Router } from '@angular/router';
import { CourseService } from '../../course/course.service';
import { BatchService } from 'src/app/batch/batch.service';
import { InstructionService } from '../instruction.service';

@Component({
  selector: 'app-instruction-add',
  templateUrl:'./instruction.add.component.html',
  styleUrls: ['./instruction.add.component.css']
})

export class InstructionAddComponent implements OnInit {

  courses=[]
  batches=[]

  ins_title = ''
  ins_description=''
  course_id:number
  batch_id:number
  ins_type=''

  ins_attachment:any

  public edited = false;

  constructor(
    private router: Router,
    private courseservice: CourseService,
    private batchservice: BatchService,
    private instructionService: InstructionService) {

      this.courseservice
      .get()
      .subscribe(response => {
        if (response['status'] == 'success') {
          this.courses = response['data']
          this.course_id = this.courses[0].id
        } else {
          console.log(response['error'])
        }
      })

      this.batchservice
      .get()
      .subscribe(response => {
        if (response['status'] == 'success') {
          this.batches = response['data']
          console.log(response);
          
          this.batch_id = this.batches[0].id
        } else {
          console.log(response['error'])
        }
      })

  }

  changeType(e) {
    
    if((e.target.value)=="all"){
      this.edited=false
    }
    else if((e.target.value)=="batchwise"){
      this.edited=true
    }
    
  }

  ngOnInit() { }

  onSelectFile(event) {
    this.ins_attachment = event.target.files[0]
  }

  onInstructionAdd() {
    if(this.edited){
      this.instructionService
      .addInstruction(this.ins_title, this.ins_description, this.ins_attachment, this.course_id, this.batch_id,this.ins_type)
      .subscribe(response => {
        if (response['status'] == 'success') {
          toastr.success('added instruction successfully')
          this.router.navigate(['/instruction-list'])
        } else {
          console.log(response['error'])
        }
      })
    }else{
      this.instructionService
      .addBatchInstruction(this.ins_title, this.ins_description, this.ins_attachment, this.ins_type)
      .subscribe(response => {
        if (response['status'] == 'success') {
          toastr.success('added instruction successfully')
          this.router.navigate(['/instruction-list'])
        } else {
          console.log(response['error'])
        }
      })
    }
    
  }
}
