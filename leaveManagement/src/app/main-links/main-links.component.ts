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
  DetailsRecived: Number = 0;

  constructor(private service: LeaveSummaryService){ }

  ngOnInit() {

    this.id = Number(sessionStorage.getItem('id'));
    // console.log(this.id);
    this.service.getPersonalDetails(this.id)
    .subscribe(Response => {
      this.PersonalDetails = Response[0];
      console.log(Response[0]);
      this.DetailsRecived = 1;
    },
    (error) => {
      alert('Error');
    })
  }

  PersonalDetailsClicked(){
    this.isClickedPersonalDetails = !this.isClickedPersonalDetails;
  }

  LeaveDetailsClicked(){
    // if(this.isClickedLeaveDetails)
      this.isClickedLeaveDetails = !this.isClickedLeaveDetails;
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
