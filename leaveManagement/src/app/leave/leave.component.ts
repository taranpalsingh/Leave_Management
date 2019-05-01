import { Component, OnInit, Input } from '@angular/core';
import { LeaveSummaryService } from '../leave-summary.service';

@Component({
  selector: 'leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent implements OnInit {

  minDate1;
  minDate2;
  maxDate1 = "2019-12-01";
  FromDate;
  timeClash: Number;
  LeavesLog;
  Types;
  id;
  sqlError;
  employeeCM;
  @Input() btnReqd: Number;
  @Input() DontCheck: Number;
  @Input() Status: String;
  constructor(private service: LeaveSummaryService) { }
  date1Update(f){
    console.log(f.value.FromDate);
    console.log(f);
    this.minDate2 = f.value.FromDate;

  }
  ngOnInit() {
    let tdate = new Date();
    this.minDate1 = tdate.getFullYear()+'-'+((tdate.getMonth().toString().length == 1)?"0":"")+(tdate.getMonth()+1)+'-'+((tdate.getDate().toString().length == 1)?"0":"")+tdate.getDate();
    this.maxDate1 = (tdate.getFullYear()+1)+'-'+((tdate.getMonth().toString().length == 1)?"0":"")+(tdate.getMonth()+1)+'-'+((tdate.getDate().toString().length == 1)?"0":"")+tdate.getDate();
    // console.log(this.minDate1);
    this.btnReqd = Number(this.btnReqd);
    this.id = Number(localStorage.getItem('id'));
    this.DontCheck = Number(this.DontCheck);

    this.service.getCM(this.id)
    .subscribe(Response => {
      this.employeeCM = Response[0].Name;
    },
    (error) => {
      alert('Error');
    })

    this.service.getLeaveRequestsLog(this.id)
    .subscribe(Response => {
      this.LeavesLog = Response;
      if(this.LeavesLog.length == 0){
        this.LeavesLog = [{
        LeaveFrom: "",
        LeaveTo: "",
        Reason: "",
        Reviewer: "",
        Status: "",
        Total: "",
        Type: ""
        }];
      }
    },
    (error) => {
      alert('Error');
    })


  }
  TimeOffClicked(){

    this.service.getLeaveTypes()
    .subscribe(Response => {
      this.Types = Response;
    },
    (error) => {
      alert('Error');
    })
  }
  RaiseRequest(f){

    console.log(f);
    let date1 = new Date(f.value.FromDate);
    let date2 = new Date(f.value.ToDate);
    const diffTime = Math.abs(date1.getTime() - date2.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))+1;

    let RequestOBJ = {
      Id: this.id,
      Type: f.value.type,
      LeaveFrom: f.value.FromDate,
      LeaveTo: f.value.ToDate,
      Reason: f.value.Reason
    }
    let addObj = {
    LeaveFrom: f.value.FromDate,
    LeaveTo: f.value.ToDate,
    Reason: f.value.Reason,
    Reviewer: this.employeeCM,
    Status: "Pending",
    Total: diffDays,
    Type: f.value.type
    }

    this.service.RequestingLeave(RequestOBJ)
      .subscribe(data => {
        this.LeavesLog.splice(this.LeavesLog.length,0,addObj);
        f.reset();
    },
    (error) => {
      // this.timeClash = 1;
      // console.log(this.timeClash);
      // setTimeout(function(){
      //   this.timeClash = 0;
      //   console.log(this.timeClash);
      // },2000);
      this.sqlError = error.error.message.originalError.info.message;
      console.log(error);
      alert(error.error.message.originalError.info.message);
	    console.log(error.error.message.originalError.info.message);
      f.reset();
    })
  }

  Reset(f){
    f.reset();
  }
}
