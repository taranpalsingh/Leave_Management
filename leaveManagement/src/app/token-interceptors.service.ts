import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/Http';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorsService implements HttpInterceptor{

  constructor() { }

  intercept(req,next){
    let tokenizedReq = req.clone()
    return next.handle(tokenizedReq);
  }
  // {
  //   setHeaders : {
  //     Authorization: 'Bearer dededefef'//+sessionStorage.getItem('token');
  //     // "Access-Control-Allow-Origin": "*",
  //     // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
  //   }
  // }
  // {
  //   provide : HTTP_INTERCEPTORS,
  //   useClass: TokenInterceptorsService,
  //   multi: true
  // }
}
