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
      this.id = data[0].id;
      this.isCM = data[0].isCM;
      if(this.id != 0){
          this.router.navigateByUrl('/home');
          // var token = jwt.sign({id:this.id}, 'leave');
          sessionStorage.setItem('id',String(this.id));
          sessionStorage.setItem('isCM',String(this.isCM));
          f.reset();
      }
    },
    (error) => {
      alert('Error');
    })

  }
}
