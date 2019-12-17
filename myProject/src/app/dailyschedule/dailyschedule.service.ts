import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DailyScheduleService {

  http: HttpClient
  url = 'http://localhost:4000/dailyschedule'

  constructor(http: HttpClient) { 
    this.http=http
  }

  get() {
    return this.http.get(this.url)
  }

  addDailySchedule(dsch_date:string,classtype_id:number,dsch_start:string,dsch_end:string,venue_id:number,sub_id:number,course_id:number,batch_id:number,fac_id:number) {
    
    const body = {
      dsch_date: dsch_date,
      classtype_id:classtype_id,
      dsch_start:dsch_start,
      dsch_end:dsch_end,
      venue_id:venue_id,
      sub_id:sub_id,
      course_id:course_id,
      batch_id:batch_id,
      fac_id:fac_id
    }
    
    return this.http.post(this.url ,body)
  }

  deleteDailySchedule(id: number) {
    return this.http.delete(this.url + '/' + id)
  }

}
