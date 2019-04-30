import { Component, OnInit } from '@angular/core';
import { LeaveSummaryService } from '../leave-summary.service';


@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit  {

  id;
  employeeCM;
  isCM = 0;

  constructor(private service : LeaveSummaryService){}
  ngOnInit(){
    this.isCM = Number(sessionStorage.getItem('isCM'));
    this.id = Number(sessionStorage.getItem('id'));
    this.service.getCM(this.id)
    .subscribe(Response => {
      this.employeeCM = Response[0].Name;
    },
    (error) => {
      alert('Error');
    })
  }
  Logout(){
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('isCM');
  }
}
