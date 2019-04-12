import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PersonalDetailsComponent } from './personal-details/personal-details.component';
import { MainLinksComponent } from './main-links/main-links.component';
import { HttpClientModule } from '@angular/common/Http';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LeaveComponent } from './leave/leave.component';
import { LeaveLinksComponent } from './leave-links/leave-links.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PersonalDetailsComponent,
    MainLinksComponent,
    LoginComponent,
    HomeComponent,
    LeaveComponent,
    LeaveLinksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
    {
      path: 'home',
      component: HomeComponent
    },
    {
      path: 'leave',
      component: LeaveComponent
    },
    {
      path: 'login',
      component: LoginComponent
    },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
