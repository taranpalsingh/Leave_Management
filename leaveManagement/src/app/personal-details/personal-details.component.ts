import { Component, OnInit } from '@angular/core';
import { LeaveSummaryService } from '../leave-summary.service';

@Component({
  selector: 'personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css']
})
export class PersonalDetailsComponent implements OnInit {

  id: Number;
  PersonalDetails: object;
  DetailsRecived: Number = 0;
  constructor(private service: LeaveSummaryService) { }

  ngOnInit() {
    this.id = Number(localStorage.getItem('id'));
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

}
