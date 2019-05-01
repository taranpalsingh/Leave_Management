import { Component, OnInit } from '@angular/core';
import { LeaveSummaryService } from '../leave-summary.service';

@Component({
  selector: 'leave-links',
  templateUrl: './leave-links.component.html',
  styleUrls: ['./leave-links.component.css']
})
export class LeaveLinksComponent implements OnInit {

  isRequestsClicked: boolean = true;
  isBalanceClicked: boolean = false;
  isOpenClicked: boolean = false;
  isApprovedClicked: boolean = false;
  isRejectedClicked: boolean = false;
  id: Number;
  LeavesLog;
  constructor(private service: LeaveSummaryService) { }

  ngOnInit() {
    this.id = Number(localStorage.getItem('id'));
  }
  RequestsClicked(){
    this.isRequestsClicked = true;
    this.isBalanceClicked = false;
    this.isOpenClicked = false;
    this.isApprovedClicked = false;
    this.isRejectedClicked = false;
  }
  BalancesClicked(){
    this.isRequestsClicked = false;
    this.isBalanceClicked = true;
    this.isOpenClicked = false;
    this.isApprovedClicked = false;
    this.isRejectedClicked = false;
  }
  OpenClicked(){
    this.isRequestsClicked = false;
    this.isBalanceClicked = false;
    this.isOpenClicked = true;
    this.isApprovedClicked = false;
    this.isRejectedClicked = false;
  }

  ApprovedClicked(){
    this.isRequestsClicked = false;
    this.isBalanceClicked = false;
    this.isOpenClicked = false;
    this.isApprovedClicked = true;
    this.isRejectedClicked = false;
  }

  RejectedClicked(){
    this.isRequestsClicked = false;
    this.isBalanceClicked = false;
    this.isOpenClicked = false;
    this.isApprovedClicked = false;
    this.isRejectedClicked = true;
  }

}
