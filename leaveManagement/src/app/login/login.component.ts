import { Component, OnInit } from '@angular/core';
import { LeaveSummaryService } from '../leave-summary.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  id = 1;
  constructor(
    private service: LeaveSummaryService,
    private router: Router
  )
  {}

  ngOnInit() {
  }

  Submit(f){
    console.log(f);
    let Obj = {
      username: f.value.username,
      password: f.value.password
    }
    console.log(Obj);
    this.service.loginRequest(Obj)
    .subscribe(data  => {
      console.log(data);
      this.id = data[0].id;
      if(this.id != 0){
          this.router.navigateByUrl('/home');
          sessionStorage.setItem('id',String(this.id));
          f.reset();
      }
    },
    (error) => {
      alert('Error');
    })

  }
}
