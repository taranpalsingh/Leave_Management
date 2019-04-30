import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-review-leaves',
  templateUrl: './review-leaves.component.html',
  styleUrls: ['./review-leaves.component.css']
})
export class ReviewLeavesComponent implements OnInit {

  isOpenClicked: boolean = true;
  isApprovedClicked: boolean = false;
  isRejectedClicked: boolean = false;
  constructor() { }

  ngOnInit() {
  }
  OpenClicked(){
    this.isOpenClicked = true;
    this.isApprovedClicked = false;
    this.isRejectedClicked = false;
  }
  ApprovedClicked(){
    this.isOpenClicked = false;
    this.isApprovedClicked = true;
    this.isRejectedClicked = false;
  }
  RejectedClicked(){
    this.isOpenClicked = false;
    this.isApprovedClicked = false;
    this.isRejectedClicked = true;
  }
}
