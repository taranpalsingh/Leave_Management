import { Component, OnInit } from '@angular/core';
import { LeaveSummaryService } from '../leave-summary.service';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent implements OnInit {

  LeavesLog;
  Types;
  id;
  employeeCM;
  constructor(private service: LeaveSummaryService) { }

  ngOnInit() {
    this.id = 6;

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
    Total: "",
    Type: f.value.type
    }
    console.log(RequestOBJ);

    this.service.RequestingLeave(RequestOBJ)
    .subscribe(data => {
      console.log(data);
      this.LeavesLog.splice(this.LeavesLog.length,0,addObj);
    },
    (error) => {
      alert('Error');
    })

  }

}
