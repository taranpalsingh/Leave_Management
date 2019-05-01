import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/Http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LeaveSummaryService {

  constructor(private http: HttpClient) {}
  // headerDict = {
  //   'Content-Type': 'application/json',
  //   'Accept': 'application/json',
  //   'Access-Control-Allow-Headers': 'Content-Type',
  //   'token': 'my-auth-token',
  // }
  //
  // requestOptions = {
  //   headers: new Headers(this.headerDict),
  // };

  getPersonalDetails(id){
    return this.http.get("http://localhost:3333/employee/"+id);
  }
  getCurrentProject(id){
    return this.http.get("http://localhost:3333/employee/project/"+id);
  }
  getLeavesLog(id){
    return this.http.get("http://localhost:3333/employee/leave/"+id);
  }
  getLeaveTypes(){
    return this.http.get("http://localhost:3333/leave/types");
  }
  getLeaveRequestsLog(id){
    return this.http.get("http://localhost:3333/employee/leaveLog/"+id);
  }
  RequestingLeave(obj){
    return this.http.post("http://localhost:3333/employee/leave/Request", obj);
  }
  getCM(id){
    return this.http.get("http://localhost:3333/employee/CM/"+id);
  }
  loginRequest(obj){
    return this.http.post("http://localhost:3333/login", obj);
  }
  getReviewLeavesLog(id){
    return this.http.get("http://localhost:3333/employee/ReviewleaveLog/"+id);
  }
  ReviewLeave(obj){
    return this.http.post("http://localhost:3333/employee/Reviewleave", obj);
  }

}
