import { Component, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, IUserPublic } from './../../services/auth.service';
import { ChatService } from './../../services/chat.service';
import { SurveyComponent } from './../survey/survey.component';

@Component({
  selector: 'lb-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass'],
})
export class NavbarComponent implements OnInit {
  @Output() survey:EventEmitter<boolean> = new EventEmitter()
  viewNav!: boolean;
  user!: IUserPublic;
  algo!: TemplateRef<SurveyComponent>;

  constructor(
    private auth: AuthService,
    private chat: ChatService,
    private router: Router,
  ) {
    this.auth.user$.subscribe((usr) => (this.user = usr));
  }

  ngOnInit(): void {
    this.auth.authState().subscribe((data) => {
      this.viewNav = !!data || false;
    });
  }

  logOut() {
    this.chat.disconnected();
    this.auth.logOut();
    this.router.navigate(['login']);
  }

  showSurvey(){
    this.survey.emit(true)
  }
}
