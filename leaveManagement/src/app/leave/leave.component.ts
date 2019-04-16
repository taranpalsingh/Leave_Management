import { Component, OnInit, Input } from '@angular/core';
import { LeaveSummaryService } from '../leave-summary.service';

@Component({
  selector: 'leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent implements OnInit {

  LeavesLog;
  Types;
  id;
  employeeCM;
  @Input() btnReqd: Number;
  @Input() DontCheck: Number;
  @Input() Status: String;
  constructor(private service: LeaveSummaryService) { }

  ngOnInit() {
    // console.log(this.btnReqd);
    this.btnReqd = Number(this.btnReqd);
    // console.log(this.btnReqd);
    this.id = Number(sessionStorage.getItem('id'));
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
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

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
      // console.log(data);
      this.LeavesLog.splice(this.LeavesLog.length,0,addObj);
      f.reset();
    },
    (error) => {
      alert('Error');
    })
  }

  Reset(f){
    f.reset();
  }
}
