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
  isClickedPersonalDetails = false ;
  isClickedLeaveDetails = false ;
  isClickedCurrentProjects = false ;
  id: Number;
  DetailsReceived: Number = 0;

  constructor(private service: LeaveSummaryService){
  }

  ngOnInit() {

    this.id = Number(localStorage.getItem('id'));
    this.service.getPersonalDetails(this.id)
    .subscribe(Response => {
      this.PersonalDetails = Response[0];
      this.DetailsReceived = 1;
    },
    (error) => {
      alert(error);
    })
  }

  PersonalDetailsClicked(){
    this.isClickedPersonalDetails = !this.isClickedPersonalDetails;
  }

  LeaveDetailsClicked(){
      this.isClickedLeaveDetails = !this.isClickedLeaveDetails;
  }

  CurrentProjectsClicked(){
    if(this.isClickedCurrentProjects)
      this.isClickedCurrentProjects = !this.isClickedCurrentProjects;
    else{
      this.service.getCurrentProject(this.id)
      .subscribe(Response => {
        this.CurrentProject = Response[0];
        this.isClickedCurrentProjects = !this.isClickedCurrentProjects;
      },
      (error) => {
        alert(error);
      })
    }
  }

}
