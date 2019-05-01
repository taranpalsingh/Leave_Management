import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/Http';
import * as jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  authToken(obj){
    console.log("auth token")
    return this.http.post("http://localhost:3333/employee/token", obj);
  }
  loggedIn(): boolean{
    console.log("Inside loggedIn service")
    let token = jwt_decode(localStorage.getItem('token'));
    if((token["role"]=="CM")||(token["role"]=="employee"))
      return true;
    else
      return false;
  }
}
