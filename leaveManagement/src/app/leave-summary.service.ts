import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/Http';
import { HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaveSummaryService {

  constructor(private http: HttpClient) {}

  getPersonalDetails(id){
    return this.http.get("http://localhost:3333/employee/"+id)
      .pipe(
        catchError(this.handleError)
      )
  }
  getCurrentProject(id){
    return this.http.get("http://localhost:3333/employee/project/"+id)
      .pipe(
        catchError(this.handleError)
      )
  }
  getLeavesLog(id){
    return this.http.get("http://localhost:3333/employee/leave/"+id)
      .pipe(
        catchError(this.handleError)
      )
  }
  getLeaveTypes(){
    return this.http.get("http://localhost:3333/leave/types")
      .pipe(
        catchError(this.handleError)
      )
  }
  getLeaveRequestsLog(id){
    return this.http.get("http://localhost:3333/employee/leaveLog/"+id)
      .pipe(
        catchError(this.handleError)
      )
  }
  RequestingLeave(obj){
    return this.http.post("http://localhost:3333/employee/leave/Request", obj)
      .pipe(
        catchError(this.handleError)
      )
  }
  getCM(id){
    return this.http.get("http://localhost:3333/employee/CM/"+id)
      .pipe(
        catchError(this.handleError)
      )
  }
  loginRequest(obj){
    return this.http.post("http://localhost:3333/login", obj)
      .pipe(
        catchError(this.handleError)
      )
  }
  getReviewLeavesLog(id){
    return this.http.get("http://localhost:3333/employee/ReviewleaveLog/"+id)
      .pipe(
        catchError(this.handleError)
      )
  }
  ReviewLeave(obj){
    return this.http.post("http://localhost:3333/employee/Reviewleave", obj)
      .pipe(
        catchError(this.handleError)
      )
  }

  handleError(error: HttpErrorResponse){
    console.log("Inside Error handler");
    if(error.status === 404)
      return throwError("Not Foound, 404");
    else
      return throwError("Not 404, Something else went wrong");
  }

}
