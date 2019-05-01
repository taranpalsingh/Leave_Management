import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LeaveSummaryService } from './leave-summary.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(private router: Router,
              private authService: AuthService){}

  canActivate(): boolean {
    if(this.authService.loggedIn()){
      console.log("Inside auth guard returning true")
      return true;
    }
    else{
      console.log("Inside auth guard returning false")
      this.router.navigateByUrl('/login');
      return false;
    }
  }

}
