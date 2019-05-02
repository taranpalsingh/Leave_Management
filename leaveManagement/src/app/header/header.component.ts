import { Component, OnInit } from '@angular/core';
import { LeaveSummaryService } from '../leave-summary.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit  {

  id;
  employeeCM;
  isCM = 0;

  constructor(private service : LeaveSummaryService,
              // private router: Router,
              private authService: AuthService){}
  ngOnInit(){
    let token = localStorage.getItem('token');
    this.isCM = Number(localStorage.getItem('isCM'));
    this.id = Number(localStorage.getItem('id'));

    this.service.getCM(this.id)
    .subscribe(Response => {
      this.employeeCM = Response[0].Name;
    },
    (error) => {
      alert(error);
    })
  }

  Logout(){
    localStorage.removeItem('id');
    localStorage.removeItem('isCM');
    localStorage.removeItem('token');
    // this.router.navigateByUrl('login')\
  }
}
