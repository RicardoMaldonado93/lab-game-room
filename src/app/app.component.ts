import { Observable } from 'rxjs';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { AuthService, IUserPublic } from './services/auth.service';
import { Component } from '@angular/core';
@Component({
  selector: 'lb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  user$!:Observable<IUserPublic>
  viewSurvey:boolean = false
  constructor(private auth:AuthService) {
    this.user$ = this.auth.user$
  }

  showSurvey(event:boolean){
    this.viewSurvey = event
    setTimeout(() => {
      this.viewSurvey = false
    }, 200);
  }
}
