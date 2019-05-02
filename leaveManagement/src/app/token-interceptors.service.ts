import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/Http';
// import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorsService implements HttpInterceptor{

  constructor() { }

  intercept(req,next){
    let tokenizedReq = {};
    let re = /login/gi;
    // console.log(req.url.search(re));
    if(req.url.search(re) === -1){
      tokenizedReq = req.clone({
        setHeaders : {
          authorization: `${localStorage.getItem('token')}`
          // 'Access-Control-Allow-Origin': '*',
          // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
        }
      })
      return next.handle(tokenizedReq);
    }
    else return next.handle(req);
  }
}
