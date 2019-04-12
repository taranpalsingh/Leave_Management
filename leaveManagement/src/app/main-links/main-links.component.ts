import { Component, OnInit } from '@angular/core';
import { LeaveSummaryService } from '../leave-summary.service';
import * as $ from 'jquery';

@Component({
  selector: 'main-links',
  templateUrl: './main-links.component.html',
  styleUrls: ['./main-links.component.css']
})
export class MainLinksComponent implements OnInit {

  PersonalDetails;
  CurrentProject;
  LeavesLog;
  isClickedPersonalDetails = false ;
  isClickedLeaveDetails = false ;
  isClickedCurrentProjects = false ;
  isClickedPastProjects = false ;
  id: Number;

  constructor(private service: LeaveSummaryService){ }

  ngOnInit() {
    this.id = 3;
    // console.log(this.id);
  }

  PersonalDetailsClicked(){
    if(this.isClickedPersonalDetails)
      this.isClickedPersonalDetails = !this.isClickedPersonalDetails;
    else{
      this.service.getPersonalDetails(this.id)
      .subscribe(Response => {
        this.PersonalDetails = Response[0];
        // console.log(Response[0]);
        this.isClickedPersonalDetails = !this.isClickedPersonalDetails;
      },
      (error) => {
        alert('Error');
      })
    }
  }

  LeaveDetailsClicked(){
    if(this.isClickedLeaveDetails)
      this.isClickedLeaveDetails = !this.isClickedLeaveDetails;
    else {
      this.service.getLeavesLog(this.id)
      .subscribe(Response => {
        this.LeavesLog = Response;
        // console.log(Response);
        this.isClickedLeaveDetails = !this.isClickedLeaveDetails;
      },
      (error) => {
        alert('Error');
      })
    }
  }

  CurrentProjectsClicked(){
    if(this.isClickedCurrentProjects)
      this.isClickedCurrentProjects = !this.isClickedCurrentProjects;
    else{
      this.service.getCurrentProject(this.id)
      .subscribe(Response => {
        this.CurrentProject = Response[0];
        console.log("response received");
        // console.log(Response[0]);
        this.isClickedCurrentProjects = !this.isClickedCurrentProjects;
      },
      (error) => {
        alert('Error');
      })
    }
  }

}
