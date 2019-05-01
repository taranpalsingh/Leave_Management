import { Component, OnInit, Input } from '@angular/core';
import { LeaveSummaryService } from '../leave-summary.service';
import { Router } from '@angular/router';

@Component({
  selector: 'review-leaves-table',
  templateUrl: './review-leaves-table.component.html',
  styleUrls: ['./review-leaves-table.component.css']
})
export class ReviewLeavesTableComponent implements OnInit {

  ReviewLeavesLog;
  id;
  RequestId: Number;
  StatusTypes = ['Approved', 'Rejected'];
  @Input() Status: String;
  constructor(private service: LeaveSummaryService,
              private router: Router){ }

  ngOnInit() {
    //console.log(this.Status);
    this.id = Number(localStorage.getItem('id'));
    if(Number(localStorage.getItem('isCM'))==0){
      alert('You are not authorized to Review Leave Requests');
      this.router.navigateByUrl('/home');
    }

    this.service.getReviewLeavesLog(this.id)
    .subscribe(Response => {
      this.ReviewLeavesLog = Response;
      //console.log(this.ReviewLeavesLog);
    },
    (error) => {
      alert('Error');
    })

  }
  Reset(f){
    f.reset();
  }
  ReviewLeave(f){
    //console.log(this.RequestId);
    //console.log(f);
    let obj = {
      RequestId: this.RequestId,
      ReviewerId: this.id,
      Reason: f.value.Reason,
      Status: f.value.newStatus
    }
    //console.log(obj);
    this.service.ReviewLeave(obj)
      .subscribe(data => {
        //console.log("Updated Successfully");
        let index = this.ReviewLeavesLog.map(function(e){return Number(e.RequestId)}).indexOf(this.RequestId);
        this.ReviewLeavesLog.splice(index,1);
      },
      (error) => {
        alert("Error");
      })
  }

}
