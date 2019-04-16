import { Component} from '@angular/core';
import { LeaveSummaryService } from '../leave-summary.service';


@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  {

  Logout(){
    sessionStorage.removeItem('id');
  }
}
