import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/Http';

@Injectable({
  providedIn: 'root'
})
export class LeaveSummaryService {

  // private url = "https://jsonplaceholder.typicode.com/posts";


  // CurrentProject = {"Name": 'Siepe', "From": '03-11-2019', "To": '07-07-2019'};
  // LeavesLog: Object =[{ Name: 'Casual Leave', Total: 10, Balance: 10, Pending: 0, Approved: 0, Rejected: 0},
  //             { Name: 'Sick Leave', Total: 20, Balance: 20, Pending: 0, Approved: 0, Rejected: 0},
  //             { Name: 'Marital Leave', Total: 15, Balance: 15, Pending: 0, Approved: 0, Rejected: 0},
  //             { Name: 'WFH', Total: 10, Balance: 10, Pending: 0, Approved: 0, Rejected: 0}];
  // PersonalDetails = {FirstName: 'Taran', LastName: 'Pal Singh', DOB: '1997/10/23',
  //                     Gender: 'M', Email: 'taran.singh'};
  // FieldsToDisplay = ['Personal Details', 'Leave Details', 'Current Project', 'Past Projects'];

  constructor(private http: HttpClient) {
  }

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

}
