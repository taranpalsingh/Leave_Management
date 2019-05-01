import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PersonalDetailsComponent } from './personal-details/personal-details.component';
import { MainLinksComponent } from './main-links/main-links.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/Http';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LeaveComponent } from './leave/leave.component';
import { LeaveLinksComponent } from './leave-links/leave-links.component';
import { LeaveSummmaryComponent } from './leave-summmary/leave-summmary.component';
import { ReviewLeavesComponent } from './review-leaves/review-leaves.component';
import { ReviewLeavesTableComponent } from './review-leaves-table/review-leaves-table.component';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorsService } from './token-interceptors.service';


const appRoutes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'leave',
    component: LeaveLinksComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'Reviewleave',
    component: ReviewLeavesComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PersonalDetailsComponent,
    MainLinksComponent,
    LoginComponent,
    HomeComponent,
    LeaveComponent,
    LeaveLinksComponent,
    LeaveSummmaryComponent,
    ReviewLeavesComponent,
    ReviewLeavesTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes
      )
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
