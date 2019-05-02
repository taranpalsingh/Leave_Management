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
  isCM;
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
      this.id = data["id"];
      this.isCM = data["isCM"];
      if(this.id != 0){
          this.router.navigateByUrl('/home');
          // var token = jwt.sign({id:this.id}, 'leave');
          localStorage.setItem('id',String(this.id));
          localStorage.setItem('isCM',String(this.isCM));
          localStorage.setItem('token', data["token"])
          f.reset();
      }
    },
    (error) => {
      alert(error);
    })

  }
}
