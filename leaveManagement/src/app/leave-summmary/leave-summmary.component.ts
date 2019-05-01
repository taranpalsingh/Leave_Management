import { Component, OnInit } from '@angular/core';
import { LeaveSummaryService } from '../leave-summary.service';

@Component({
  selector: 'leave-summmary',
  templateUrl: './leave-summmary.component.html',
  styleUrls: ['./leave-summmary.component.css']
})
export class LeaveSummmaryComponent implements OnInit {
  LeavesLog: Object;
  id: Number;

  constructor(private service: LeaveSummaryService) { }

  ngOnInit() {

    this.id = Number(localStorage.getItem('id'));
    this.service.getLeavesLog(this.id)
    .subscribe(Response => {
      this.LeavesLog = Response;
    },
    (error) => {
      alert('Error');
    })
  }


}
